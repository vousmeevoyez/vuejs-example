<template>
  <el-col>
    <el-row>
      <h1>Discover Mentor</h1>
      <el-table :data="mentors" stripe>
        <el-table-column prop="profile" width="200px">
          <el-row slot-scope="{ row }">
            <img :src="row.image" class="mentor-thumbnail" />
          </el-row>
        </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 'AVAILABLE' ? 'success' : 'danger'"
              disable-transitions
              >{{ convertToFriendlyStatus(scope.row.status) }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template slot-scope="scope">
            <el-button
              round
              size="mediun"
              @click="handleEdit(scope.$index, scope.row)"
              :type="scope.row.status === 'AVAILABLE' ? 'primary' : 'disabled'"
              >Book</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-col>
</template>
<script>
export default {
  name: "DiscoverTab",
  props: {
    mentors: Array
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
  height: 150px;
  width: 150px;
  border-radius: 50%;
}
</style>
