<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="">
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  background-image: url(./assets/img/Holi-Color-Transparent-Background.png);
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
  background-color: white;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

@media screen and (max-width: 768px) {
  body {
    background-image: url(./assets/img/Holi-Color-Transparent-Background.png);
    background-attachment: fixed;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 5%;
    background-color: white;
  }
}
</style>
