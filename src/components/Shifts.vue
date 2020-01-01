<template>
  <div>
    <div v-if="userInvalid" class="err">
      Sorry we did not find that users barcode, please use buttons directly.
    </div>
    <div v-masonry
         class="d-flex flex-wrap"
         transition-duration="0.3s"
         item-selector=".item"
    >
      <Shift v-for="(shift, ind) in currentShifts"
             :key="ind"
             v-masonry-tile
             class="item"
             :shift="shift"
             :user="user"
      />
    </div>
    <div class="d-flex justify-content-end">
      <b-form-input type="text"
             placeholder="barcode"
             autofocus
             class="mr-2"
             v-model="barcode" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Shift from "@/components/Shift";
  import _ from 'lodash';

  export default {
    name: "Shifts",
    components: {Shift},
    props: ['department', 'departmentId', 'user'],
    data(){
      return {
        shifts: [],
        currentTime: Date.parse('2020-01-02 02:00:00.000'),
        barcode: "",
        userInvalid: false
      }
    },

    computed:{
      currentShifts(){
        var shifts = []
        var curTime = this.currentTime;
        this.shifts.forEach(shift => {
          if (Date.parse(shift.start_time) - (3600000 * 5) < curTime + (3600000 / 4)){//Date.now()){
            if (curTime < Date.parse(shift.end_time) - (3600000 * 5)){
              shifts.push(shift)
            }
          }
        })
        return shifts
      },
    },

    methods: {
      setup(){
        axios.get('http://10.101.22.58:3000/uber_proxy/get_shifts', {
          params: {
            department_id: this.departmentId
          }
        })
          .then(response => {
            this.shifts = response
              .data
              .result
              .result
          })
      },

      updateBarcode: _.debounce(function(barcode){
        axios.get('http://10.101.22.58:3000/uber_proxy/get_user_from_barcode', {
          params: {
            barcode: barcode
          }
        }).then(response => {
          this.barcode = "";
          this.getUsersShifts(response.data.result);
        }).catch(() => {
          this.userInvalid = true;
          this.barcode = "";
          setTimeout(() => {
            this.userInvalid = false
          }, 5000)
        })
      }.bind(this), 300),

      getUsersShifts(attendee){
        console.log('attendee:', attendee)
      },

      updateTime(){
        this.currentTime = Date.now();
        this.setup();
        setTimeout(this.updateTime, 60000)
      }
    },

    mounted(){
      console.log(this.departmentId)
      this.setup();
      this.updateTime();
      this.$bus.$on('shifts-updated', this.setup);
    },

    watch:{
      department(){
        this.setup();
      },

      barcode() {
        console.log('barcode updated');
        if (this.barcode !== ""){
          this.updateBarcode(this.barcode);
        }
      }
    }
  }
</script>

<style scoped>

</style>