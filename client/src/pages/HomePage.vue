<template>
  <div class="container justify-content-center">
    <section class="row my-5 justify-content-center">
      <div class=" col-7 col-sm-12 mb-2">
        <div class="bg-dark-glass p-2 d-block d-sm-flex justify-content-around" title="filter events">
          <button class="btn btn-outline-light w-100 mx-sm-2 my-2" role="button" title="all" @click="changeCategory('')">
            all
          </button>
          <button @click="changeCategory(category)" class="btn btn-outline-light w-100 mx-sm-2 my-2" role="button"
            type="button" :title="category" v-for="category in categories" :key="category">
            {{ category }}
          </button>
          <button v-if="account.id" type="button" class="btn btn-outline-light w-100 mx-0 mx-sm-2 my-2" role="button"
            title="create event" data-bs-toggle="modal" data-bs-target="#createEventFormModal">
            <i class="mdi mdi-plus-thick"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex justify-content-center d-md-block">
        <div class="masonry">
          <div v-for="towerEvent in towerEvents" :key="towerEvent.id">
            <Event :towerEventProp="towerEvent" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue"
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import Event from "../components/Event.vue";
import CreateEvent from "../components/CreateEvent.vue";

export default {
  setup() {
    const categories = ["concert", "convention", "digital", "sport"];
    const filteredCategory = ref("");
    onMounted(() => {
      getTowerEvents();
    });
    async function getTowerEvents() {
      try {
        await eventsService.getTowerEvents();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    return {
      categories,
      filteredCategory,
      account: computed(() => AppState.account),
      // towerEvents: computed(() => AppState.towerEvents),
      towerEvents: computed(() => {
        if (filteredCategory.value) {
          return AppState.towerEvents.filter(
            (towerEvent) => towerEvent.category == filteredCategory.value
          )
        } else {
          return AppState.towerEvents
        }
      }),
      changeCategory(category) {
        // logger.log(category)
        filteredCategory.value = category;
      }
    };
  },
  components: { Event, CreateEvent }
}
</script>

<style scoped lang="scss">
.masonry {
  columns: 260px;
  justify-content: center;
}

.bg-dark-glass {
  background: rgba(0, 0, 0, 0.609);
  border-radius: 7px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.7px);
  -webkit-backdrop-filter: blur(6.7px);
}

// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;

//   .home-card {
//     width: 50vw;

//     >img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
