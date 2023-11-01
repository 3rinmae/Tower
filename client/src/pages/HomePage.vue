<template>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <!-- TODO add glassbox with slight blur her to hold buttons -->
        <div class="bg-primary p-4 d-flex justify-content-around">
          <button class="btn btn-outline-light w-100 mx-3" @click="changeCategory('')">
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
      <div class="col-12 col-md-3">

      </div>
    </section>
  </div>
</template>

<script>
import { onMounted } from "vue"
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {
    const types = ['concert', 'convention', 'digital', 'sport']
    const filteredType = ref('')
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
    return {}
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
