<template>
  <div class="container">
    <div class="about text-center">
      <h1 class="title-text">Welcome {{ account.name }}</h1>
      <img class="rounded account-img" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <section v-if="!tickets.length && account.id" class="row">
      <div>
        Loading Account Page...
      </div>
    </section>
    <section v-else class="row justify-content-center">
      <div class="col-md-6">
        <p class="fs-2 text-center title-text fw-bold">Upcoming Events</p>
        <div v-for="ticket in tickets" :key="ticket.id" class="row bg-dark m-3">
          <div class="col-12 col-md-6 p-0">
            <img class="img-fluid eventImg" :src="ticket.event.coverImg" alt="event cover image"
              :title="ticket.event.name">
          </div>
          <div class="col col-sm-6 p-2 d-sm-flex align-content-sm-between flex-sm-wrap">
            <div>
              <p class="m-0 fs-4 px-3"> {{ ticket.event.name }} </p>
            </div>
            <div class="p-3">
              <button @click="destroyTicket(ticket.id)" class="btn btn-outline-danger" role="button" type="button"
                title="delete ticket">Delete Ticket</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section v-if="!tickets" class="row">
      <div>
        Loading Account Page...
      </div>
    </section> -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { ticketsService } from "../services/TicketsService.js";
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      // getMyTickets()
    })

    // async function getMyTickets() {
    //   try {
    //     // const accountId = route.params.accountId
    //     await ticketsService.getMyTickets()
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.error(error)
    //   }
    // }
    return {
      route,
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),

      async destroyTicket(ticketId) {
        try {
          const yes = await Pop.confirm('Are you sure you would like to delete your ticket to this event?')
          if (!yes) {
            return
          }
          // logger.log(ticketId)
          // const ticketId = ticket.id
          await ticketsService.destroyTicket(ticketId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.account-img {
  max-width: 100px;
}

.eventImg {
  /* height: 14rem;
  width: 14rem; */
  object-fit: cover;
  position: center;
}

.title-text {
  text-shadow: 0px 0px 14px white;
}
</style>
