<template>
  <div class="container">
    <section v-if="activeEvent" class="row bg-dark-glass p-4 my-5 ">
      <div class="col-md-4 d-flex justify-content-center  justify-content-md-start">
        <img class="img-fluid eventImg" :src="activeEvent.coverImg" alt="event cover image" :title="activeEvent.name">
      </div>
      <div class="col-12 col-md-8">
        <section class="row">
          <div class="col-12 d-flex justify-content-end">
            <i class="mdi mdi-dots-horizontal"></i>
          </div>
        </section>
        <section class="row text-white">
          <div class="col-6">
            <div class="fs-2">
              {{ activeEvent.name }}
            </div>
            <div class="fs-4">
              {{ activeEvent.location }}
            </div>
          </div>
          <div class="col-6 fs-4 d-flex justify-content-end">
            <!-- {{ activeEvent.startDate.getDay() }} -->
            {{ activeEvent.startDate.toLocaleDateString() }}
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
          <div class="col-6 text-white d-flex align-items-end">
            <p class="fs-4">
              {{ activeEvent.capacity - activeEvent.ticketCount }} ticket(s) left
            </p>
          </div>
          <div class="col-6 text-end">
            <button v-if="activeEvent.capacity - activeEvent.ticketCount > 0 && activeEvent.isCanceled == false"
              @click="getTicket()" class="btn btn-outline-light" role="button" type="button" title="get ticket">
              Get Ticket
            </button>
            <p v-if="activeEvent.isCanceled == true" class="m-0 text-danger fw-bold fs-4">This event is canceled</p>
            <p v-if="activeEvent.capacity - activeEvent.ticketCount <= 0" class="m-0 text-danger fw-bold fs-4">This event
              is sold out</p>
            <!-- TODO add v-if logic for if user has a ticket to this event -->
            <p class="m-0 text-primary fs-4">You are attending this event</p>

          </div>
        </section>
      </div>
    </section>
    <section class="row">

    </section>
    <section class="row">

    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getEventById()
    })

    async function getEventById() {
      try {
        const towerEventId = route.params.towerEventId
        await eventsService.getEventById(towerEventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }
    return {
      route,
      towerEvents: computed(() => AppState.towerEvents),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),

      async getTicket() {
        try {
          const towerEventId = route.params.towerEventId
          await ticketsService.getTicket(towerEventId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }
    }
  }
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
</style>