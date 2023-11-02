<template>
  <div class="bg-dark-glass p-2 mb-2">
    <router-link :to="{ name: 'EventDetails', params: { towerEventId: towerEventProp.id } }">
      <img class="img-fluid rounded-top" :src="towerEventProp.coverImg" alt="event cover image"
        :title="towerEventProp.name">
      <p class="text-white pt-2 m-0">{{ towerEventProp.name }}</p>
    </router-link>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/TowerEvent.js";
export default {
  props: { towerEventProp: { type: TowerEvent, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
img {
  height: 18rem;
  width: 18rem;
  background-size: cover;
  position: center;
}

.bg-dark-glass {
  background: rgba(0, 0, 0, 0.609);
  max-width: 19rem;
  border-radius: 7px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.7px);
  -webkit-backdrop-filter: blur(6.7px);
}
</style>