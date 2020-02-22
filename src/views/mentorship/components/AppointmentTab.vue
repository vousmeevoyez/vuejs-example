<template>
  <el-col>
    <el-row>
      <h1>My Appointment</h1>
      <el-table v-loading="loading" :data="appointments" stripe>
        <el-table-column>
          <template slot-scope="scope">
            <div class="image-cropper">
              <img :src="getImage(scope.row.schedule.mentor.image)" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{
              scope.row.schedule.mentor.first_name +
                " " +
                scope.row.schedule.mentor.last_name
            }}
          </template>
        </el-table-column>
        <el-table-column label="Date">
          <template slot-scope="scope">
            {{ scope.row.schedule.start | humanDate }}
          </template>
        </el-table-column>
        <el-table-column label="Start Time">
          <template slot-scope="scope">
            {{ scope.row.schedule.start | humanHour }}
          </template>
        </el-table-column>
        <el-table-column label="End Time">
          <template slot-scope="scope">
            {{ scope.row.schedule.end | humanHour }}
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template slot-scope="scope">
            <el-button
              round
              size="medium"
              type="danger"
              @click="handleCancelBook(scope.row.id)"
              >Cancel</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-col>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "AppointmentTab",
  methods: {
    ...mapActions([
      "getAppointments",
      "deleteAppointment",
      "triggerSuccess",
      "triggerError"
    ]),
    fetchData() {
      const userId = this.$store.getters["userId"];
      this.loading = true;
      this.getAppointments(userId)
        .then(data => {
          this.loading = false;
          this.appointments = this.$store.state.mentor.appointments;
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    },
    getImage(url) {
      if (url === null) {
        return require("@/assets/images/profile.jpeg");
      }
      return url;
    },
    handleCancelBook(appointmentId) {
      this.loading = true;
      this.deleteAppointment(appointmentId)
        .then(data => {
          this.loading = false;
          this.triggerSuccess("Booking successfullly cancelled..");
          this.fetchData();
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    }
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      loading: false,
      showCancelBookDialog: false,
      appointments: []
    };
  }
};
</script>
<style scoped>
.image-cropper {
  width: 80px;
  height: 80px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

img {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}
</style>
