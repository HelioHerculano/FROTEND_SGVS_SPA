<script setup>
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from './components/HelloWorld.vue'
import LayOut from "./components/shared/LayOut.vue";
</script>

<template>
  <!-- Start preloader -->
  <div class="loader-bg">
    <div class="loader-p"></div>
  </div>
  <!-- End preloader -->

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <LayOut />
</template>

<script>
import Utilits from "./Utilits.js";
export default {
  created() {
    Utilits.hideLoader();
  },
};
</script>
