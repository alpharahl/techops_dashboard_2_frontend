<template>
  <div class="shift" :class="{worked, notWorked}">
    {{shift.name}}
    <staff-slot
      v-for="(staff,ind) in shift.shifts"
      :key="ind"
      :staff-slot="staff"
    ></staff-slot>
  </div>
</template>

<script>
  import StaffSlot from "@/components/StaffSlot";
  export default {
    name: "Shift",
    components: {StaffSlot},
    props: ['shift'],
    computed: {
      workedShifts() {
        var worked = [];
        this.shift.shifts.forEach(shift => {
          if (shift.worked_label !== "SELECT A STATUS") {
            worked.push(shift)
          }
        })
        return worked;
      },

      worked(){
        return this.workedShifts.length / this.shift.shifts.length > 0.6
      },

      notWorked(){
        return !this.worked;
      }
    }
  }
</script>

<style scoped>
.shift{
  text-align: center;
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
}

  .staff-list{
    font-size: 12px;
  }

  .notWorked{
    background-color: rgb(255, 75, 75);
    color: white;
  }

  .worked{
    background-color: rgb(75,255, 75);
  }


</style>