<template>
  <el-col>
    <el-row>
      <h1>My Appointment</h1>
      <el-table :data="appointments" stripe>
        <el-table-column prop="profile" width="200px">
          <el-row slot-scope="{ row }">
            <img :src="row.image" class="mentor-thumbnail" />
          </el-row>
        </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="date" label="Date"> </el-table-column>
        <el-table-column prop="time" label="Time"> </el-table-column>
        <el-table-column label="Operations">
          <template>
            <el-button round size="medium" type="danger">Cancel</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-col>
</template>
<script>
export default {
  name: "AppointmentTab",
  props: {
    appointments: Array
  },
  methods: {
    convertToFriendlyStatus(status) {
      let stringStatus = "Available";
      if (status !== "AVAILABLE") {
        stringStatus = "Not Available";
      }
      return stringStatus;
    }
  }
};
</script>
<style scoped>
.mentor-thumbnail {
  margin: 0 0 0 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
</style>
