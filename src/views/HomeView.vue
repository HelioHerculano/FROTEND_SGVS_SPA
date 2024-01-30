

<template>
  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>
<script>
import TheWelcome from '../components/TheWelcome.vue'
import Utilits from '../Utilits.js'
import { AppState } from '@/stores/AppState';

export default{
    data(){
      return{
      appState: AppState()
      }
    },
  mounted(){
    this.appState.setisLogin(false)
    // Utilits.startSide()
  }
}
</script>