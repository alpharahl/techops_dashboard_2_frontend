<template>
  <div>
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
      >
      </Shift>
    </div>
    <div class="d-flex justify-content-end">
      <input type="text" placeholder="barcode" autofocus :value="barcode" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Shift from "@/components/Shift";

  export default {
    name: "Shifts",
    components: {Shift},
  props: ['department', 'departmentId', 'barcode'],
    data(){
      return {
        shifts: [],
        currentTime: Date.parse('2020-01-02 02:00:00.000'),
      }
    },

    computed:{
      currentShifts(){
        var shifts = []
        var curTime = this.currentTime;
        this.shifts.forEach(shift => {
          if (Date.parse(shift.start_time) < curTime + (3600000 / 4)){//Date.now()){
            if (curTime < Date.parse(shift.end_time)){
              shifts.push(shift)
            }
          }
        })
        return shifts
      },

      updateBarcode() {
        return this.barcode;
      }
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

      updateTime(){
        this.currentTime = Date.now();
        setTimeout(this.updateTime, 10000)
      }
    },

    mounted(){
      console.log(this.departmentId)
      this.setup();
      // this.updateTime();
      this.$bus.$on('shifts-updated', this.setup);
    },

    watch:{
      department(){
        this.setup();
      },
      barcode() {
        this.updateBarcode();
      }
    }
  }
</script>

<style scoped>

</style>