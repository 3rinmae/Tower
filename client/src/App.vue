<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <footer class="">
  </footer>
  <CreateEvent />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import CreateEvent from "./components/CreateEvent.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, CreateEvent }
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
  font-family: 'Bodoni Moda', serif;
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

.red-text {
  text-shadow: 0px 0px 12px white;
  // font-weight: bold;
  color: red;
}

.bodoni {
  font-family: 'Bodoni Moda', serif;
}

.indie-flower {
  font-family: 'Indie Flower', cursive;
}

.nosifer {
  font-family: 'Nosifer', sans-serif;
}

.poiret-one {
  font-family: 'Poiret One', sans-serif;
}

.shadows1 {
  font-family: 'Shadows Into Light', cursive;
}

.shadows2 {
  font-family: 'Shadows Into Light Two', cursive;
}
</style>
