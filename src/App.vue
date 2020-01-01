<template>
  <div id="app" v-if="signedIn">
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
      :user="uberAccount"
    />

  </div>
  <div v-else>
    Please sign in using your uber admin account
    <b-form-input
      v-model="uberAccount"
      placeholder="email"
    />
    <b-form-input
      v-model="uberPassword"
      placeholder="password"
      type="password"
    />
    <b-button
      type="submit"
      @click="login"
    >
      Login
    </b-button>
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
      department: "9d8e07d1-ce40-4869-8738-c6e22d5be5a3",
      signedIn: false,
      uberAccount: "",
      uberPassword: ""
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

    login(){
      axios({
        method: 'POST',
        url: "http://10.101.22.58:3000/uber_proxy/admin_login",
        data: {
          email: this.uberAccount,
          password: this.uberPassword
        }
      }).then(response => {
        console.log(response.status)
        if (response.status === 200){
          this.signedIn = true;
        }
      }).catch(() => {
        alert("Only uber admins are allowed to use this system. Please use your existing uber admin account.");
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
