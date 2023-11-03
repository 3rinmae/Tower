<template>
  <div class="container p-5 p-md-0">
    <section v-if="!activeEvent" class="row ">
      <div class="col-12">
        Loading Event Details...
      </div>
    </section>
    <section v-else class="row bg-dark-glass p-4 my-5">
      <div class="col-md-4 d-flex justify-content-center justify-content-md-start">
        <img class="img-fluid eventImg" :src="activeEvent.coverImg" alt="event cover image" :title="activeEvent.name">
      </div>
      <div class="col-12 col-md-8">
        <section class="row text-white">
          <div class="col-12 col-sm-6">
            <div class="fs-1 pt-3 pt-sm-0">
              {{ activeEvent.name }}
            </div>
            <div class="fs-4">
              {{ activeEvent.location }}
            </div>
          </div>
          <div class="col-12 col-sm-6 fs-4 d-flex justify-content-sm-end">
            <!-- {{ activeEvent.startDate.getDay() }} -->
            <div class="">
              <div>
                <p class="m-0">
                  {{ activeEvent.startDate.toLocaleDateString() }}
                </p>
              </div>
              <div v-if="account.id == activeEvent.creatorId && activeEvent.isCanceled == false"
                class="d-flex justify-content-end">
                <button @click="cancelEvent()" title="cancel event" class="btn selectable text-white" role="button">
                  <i class="mdi mdi-calendar-remove fs-4"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="row text-white">
          <div class="col-12 mt-4">
            <p>
              {{ activeEvent.description }}
            </p>
            <p class="">
              Category - {{ activeEvent.category }}
            </p>
          </div>
        </section>
        <section class="row">
          <div class="col-12 col-md-6 text-white d-flex align-items-start align-items-sm-end">
            <p v-if="activeEvent.isCanceled == false" class="fs-5 m-0">
              {{ activeEvent.capacity - activeEvent.ticketCount }} ticket(s) left
            </p>
          </div>
          <div class="col-12 col-md-6 text-end">
            <button
              v-if="activeEvent.capacity - activeEvent.ticketCount > 0 && activeEvent.isCanceled == false && account.id"
              @click="getTicket()" class="btn btn-outline-light my-2" role="button" type="button" title="get ticket">
              Get Ticket
            </button>
            <p v-if="activeEvent.isCanceled == true" class="red-text fw-bold fs-4 my-2">This event is canceled</p>
            <p v-if="activeEvent.capacity - activeEvent.ticketCount <= 0" class="red-text fw-bold fs-4 my-2">This
              event is sold out</p>
            <p v-if="hasTicket && activeEvent.isCanceled == false" class=" text-primary fs-5 my-2">You are attending
              this
              event</p>
          </div>
        </section>
      </div>
    </section>
    <section v-if="!activeEvent" class="row">
      <div class="col-12">
        Loading Event Details...
      </div>
    </section>
    <section v-else-if="activeEvent.isCanceled == false" class="row my-5">
      <div class="col-12 bg-dark-glass px-3 py-2">
        <section class="row">
          <p class="col-12 text-light m-0">See who is attending</p>
        </section>
        <section class="row">
          <div v-for="ticket in tickets" :key="ticket.creator" class="col-3 col-sm-2 col-md-1 p-2">
            <img class="rounded-circle img-fluid" :src="ticket.creator.picture" alt="profile picture"
              :title="ticket.creator.name">
          </div>
        </section>
      </div>
    </section>
    <section v-if="account.id" class="row my-3 p-3 bg-dark-glass">
      <div>
        <form @submit.prevent="createComment()">
          <div class="">
            <textarea v-model="editable.body" placeholder="Join the conversation" maxlength="1000"
              class="form-control my-3" id="comment" rows="3" title="comment about event"></textarea>
          </div>
          <div class="text-end">
            <button class="btn btn-primary" title="post comment" role="button" type="submit">Post Comment</button>
          </div>
        </form>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="col-12  p-3">
        <div class=" d-flex">
          <div>
            <img :src="comment.creator.picture" alt="comment creator picture" :title="comment.creator.name"
              class="creatorImg rounded-circle">
          </div>
          <div class="bg-light rounded w-100 p-2 ms-3">
            <div class="d-flex justify-content-between">
              <p class="fs-4 fw-bold m-0">
                {{ comment.creator.name }}
              </p>
              <button @click="destroyComment(comment.id)" v-if="comment.creatorId == account.id" class="btn" type="button"
                role="button" title="delete comment">
                <i class="mdi mdi-delete-forever-outline"></i>
              </button>
            </div>
            <p class="m-0">
              {{ comment.body }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="row ">
      <div v-for="comment in comments" :key="comment.id" class="col-12 my-3 p-3 bg-dark-glass">
        <div class=" d-flex">
          <div>
            <img :src="comment.creator.picture" alt="comment creator picture" :title="comment.creator.name"
              class="creatorImg rounded-circle">
          </div>
          <div class="bg-light rounded w-100 p-2 ms-3">
            <p class="fs-4 fw-bold m-0">
              {{ comment.creator.name }}
            </p>
            <p class="m-0">
              {{ comment.body }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";
export default {
  setup() {
    const editable = ref({})
    const route = useRoute();
    onMounted(() => {
      getEventById();
      getTicketsByEvent();
      getCommentsByEvent()
    });
    async function getEventById() {
      try {
        const towerEventId = route.params.towerEventId;
        await eventsService.getEventById(towerEventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    async function getTicketsByEvent() {
      try {
        const towerEventId = route.params.towerEventId;
        await ticketsService.getTicketsByEvent(towerEventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    async function getCommentsByEvent() {
      try {
        const towerEventId = route.params.towerEventId
        await commentsService.getCommentsByEvent(towerEventId)
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    return {
      route,
      editable,
      towerEvents: computed(() => AppState.towerEvents),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      hasTicket: computed(() => AppState.tickets.find((ticket) => ticket.creator.id == AppState.account.id)),
      async getTicket() {
        try {
          const towerEventId = route.params.towerEventId;
          await ticketsService.getTicket(towerEventId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      async cancelEvent() {
        try {
          // const towerEventId = route.params.towerEventId
          if (!this.activeEvent.isCanceled) {
            const yes = await Pop.confirm("Are you sure you want to cancel this event?");
            if (!yes) {
              return;
            }
          }
          else {
            const yes = await Pop.confirm("Are you sure you want to un-cancel this event?");
            if (!yes) {
              return;
            }
          }
          const towerEventId = route.params.towerEventId;
          await eventsService.cancelEvent(towerEventId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },

      async createComment() {
        try {
          const commentData = editable.value
          commentData.eventId = route.params.towerEventId
          await commentsService.createComment(commentData)
          Pop.success('Your comment has been submitted')
          editable.value = {}
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },

      async destroyComment(commentId) {
        try {
          const yes = await Pop.confirm('Are you sure you would like to delete this comment?')
          if (!yes) {
            return
          }
          await commentsService.destroyComment(commentId)
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }
    };
  },
  components: {}
};
</script>


<style lang="scss" scoped>
.bg-dark-glass {
  background: rgba(0, 0, 0, 0.609);
  border-radius: 7px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.7px);
  -webkit-backdrop-filter: blur(6.7px);
}

.eventImg {
  height: 25rem;
  width: 25rem;
  object-fit: cover;
  position: center;
}

.creatorImg {
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  position: center;
}
</style>