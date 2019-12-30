<template>
  <div id="app">
    <div class="d-flex top-bar">
      {{departments[department]}}
      <div class="ml-auto">
        Click "X" by your shift to mark
      </div>
      <div class="ml-auto">
        <b-form-select
          v-model="department"
          :options="departments"
        />
      </div>
    </div>
    <div v-if="department === ''">
      Please select a department to display
    </div>
    <Shifts
      :department="departments[department]"
      :department-id="department"
    />

  </div>
</template>

<script>
import axios from 'axios';
import Shifts from "@/components/Shifts";

export default {
  name: 'app',
  components: {Shifts},
  data(){
    return {
      departments: [],
      // department: "f05b8567-7614-50a9-a3ba-d5f9fcc064d5"
      department: "9d8e07d1-ce40-4869-8738-c6e22d5be5a3"
    }
  },

  computed: {
  },

  methods: {
    hitUber(){
      axios({
        method: 'POST',
        url: "http://10.101.22.58:3000/uber_proxy/attendee_search",
      })
      .then(response => {
        console.log('resp', response)
      })
    },

    getDepartments(){
      axios.get('http://10.101.22.58:3000/uber_proxy/get_departments')
        .then(response => {
          console.log('resp', response.data.result.result)
          this.departments = response.data.result.result
        })
    }
  },

  mounted(){
    this.getDepartments();
  },
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

  .top-bar{
    background-color: rgba(26,26,26,1);
    color: rgba(230,230,230,1);
    padding: 10px 35px;
  }
</style>
