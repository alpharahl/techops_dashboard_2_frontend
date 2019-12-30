<template>
  <div class="d-flex" :class="{worked, notWorked}">
    <small class="mr-2 align-self-center">{{staffSlot.attendee.full_name}}</small>
    <div class="ml-auto">
      <b-btn @click="markNotWorked"
             class="worked-button"
             variant="link"
             v-if="worked">✔</b-btn>
      <b-btn @click="markWorked"
             v-else
             class="not-worked-button"
             variant="link">X</b-btn>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "StaffSlot",
    props: ['staffSlot'],

    computed: {
      worked(){
        return this.staffSlot.worked ===  59709335
      },

      notWorked(){
        return !this.worked
      }
    },

    methods: {
      markWorked(){
        axios({
          method: 'POST',
          url: 'http://10.101.22.58:3000/uber_proxy/mark_shift_worked',
          params: {
            shift_id: this.staffSlot.id
          }
        }).then(() => {
          this.$bus.$emit('shifts-updated')
        })
      },

      markNotWorked(){
        axios({
          method: 'POST',
          url: 'http://10.101.22.58:3000/uber_proxy/mark_shift_not_worked',
          params: {
            shift_id: this.staffSlot.id
          }
        }).then(() => {
          this.$bus.$emit('shifts-updated')
        })
      }
    }
  }
</script>

<style scoped>
  .worked{

  }

  .notWorked{

  }

  .not-worked-button{
    color: white;
    padding: 2px;
  }

  .worked-button{
    padding: 2px;
  }

</style>