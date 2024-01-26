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
  <!-- <LoginView/> -->
</template>

<script>
import Utilits from "./Utilits.js";
import LoginView from "./views/LoginView.vue";
export default {
  data(){
    return{
      LoginView
    }
  },
  created() {
    Utilits.hideLoader();
  },
};
</script>
