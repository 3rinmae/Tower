<template>
  <div class="container">
    <section class="row">
      <div class="col-12 mb-2">
        <!-- TODO add glassbox with slight blur her to hold buttons -->
        <div class="bg-dark-glass p-2 ">
          <button class="btn btn-outline-light w-100" @click="changeCategory('')">
            All
          </button>
          <!-- <button @click="changeCategory(category)" class="btn btn-outline-light w-100 mx-3"
            v-for="category in categories" :key="category">
            {{ category }}
          </button> -->
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
import { computed, onMounted } from "vue"
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";

export default {
  setup() {
    // const categories = ['concert', 'convention', 'digital', 'sport'];
    // const filteredCategory = ref('');
    onMounted(() => {
      getTowerEvents()
    })
    async function getTowerEvents() {
      try {
        await eventsService.getTowerEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }
    return {
      // categories,
      // filteredCategory,
      towerEvents: computed(() => AppState.towerEvents)
      // towerEvents: computed(() => {
      //   if (filteredCategory.value) {
      //     return AppState.towerEvents.filter(
      //       (towerEvent) => towerEvent.category == filteredCategory.value
      //     )
      //   } else {
      //     return AppState.towerEvents
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.masonry {
  columns: 300px;
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
