<template>
  <div class="text-center" style="text-align: center;">
        <h1>
        <img :src="require('../assets/Logo-Black.png')"
               style="width: 150px;height: 150px"
             class="mt-9"
        >
        </h1>
        <h1>Call For Nation</h1>
        <p>A Website for COVID-19 Relief Distribution and Management</p>
        <v-btn rounded class="light-blue lighten-4" style="top: 5vh" to="/search">
          Explore
        </v-btn>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  },
  mounted() {

  }
}
</script>

<style>

</style>