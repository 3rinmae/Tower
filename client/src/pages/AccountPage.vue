<template>
  <div class="container">
    <!-- Need to add bootstrap stuff -->
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <section class="row">
      <div class="col-12">
        <p class="fs-2">Upcoming Events</p>
        <div v-for="ticket in tickets" :key="ticket.id" class="row">
          <div class="col-12 my-2 bg-dark">
            <img class="img-fluid" :src="ticket.event.coverImg" alt="event cover image" :title="ticket.event.name">
          </div>

        </div>
      </div>
    </section>
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
      getMyTickets()
    })

    async function getMyTickets() {
      try {
        const accountId = route.params.accountId
        await ticketsService.getMyTickets(accountId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }
    return {
      route,
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
