<template>
  <el-col>
    <el-row>
      <h1>Discover Mentors</h1>
      <el-table v-loading="loading" :data="mentors" style="width: 100%" stripe>
        <el-table-column>
          <template slot-scope="scope">
            <div class="image-cropper">
              <img :src="getImage(scope.row.image)" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.first_name + " " + scope.row.last_name }}
          </template>
        </el-table-column>
        <el-table-column label="Occupation">
          <template slot-scope="scope">
            {{ scope.row.mentorprofile.occupation }}
          </template>
        </el-table-column>
        <el-table-column label="Price">
          <template slot-scope="scope">
            ${{ scope.row.mentorprofile.rate }}
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template slot-scope="scope">
            <el-button
              round
              size="medium"
              @click="handleBookDialog(scope.row.id)"
              type="primary"
              >Book</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <BookDialog
      title="Book Schedule"
      :loading="loading"
      :dialog.sync="showBookDialog"
      :categoryOptions="scheduleOptions"
      @submit="handleBook"
      @close="handleCloseBook"
    />
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
import BookDialog from "./BookDialog.vue";

export default {
  name: "DiscoverTab",
  components: {
    BookDialog
  },
  methods: {
    ...mapActions([
      "getUsers",
      "getSchedules",
      "createAppointment",
      "triggerSuccess",
      "triggerError"
    ]),
    fetchData() {
      this.getUsers("MENTOR")
        .then(data => {
          this.loading = false;
          this.mentors = this.$store.state.mentor.mentors;
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
    handleBookDialog(mentorUserId) {
      this.getSchedules(mentorUserId)
        .then(data => {
          this.showBookDialog = true;
          this.scheduleOptions = this.$store.state.mentor.schedules;
        })
        .catch(error => {
          console.log(error);
          this.triggerError(error);
        });
    },
    handleCloseBook() {
      this.showBookDialog = false;
      this.scheduleOptions = [];
    },
    handleBook(bookInfo) {
      console.log(bookInfo);
    }
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      loading: true,
      showBookDialog: false,
      mentors: [],
      scheduleOptions: []
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
