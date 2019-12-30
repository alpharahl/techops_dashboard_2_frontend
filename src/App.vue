<template>
  <div id="app">
    <b-btn @click="hitUber">Fire!</b-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  components: {
  },

  methods: {
    hitUber(){
      axios({
        method: 'POST',
        url: "http://localhost:3000/uber_proxy/attendee_search",
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
