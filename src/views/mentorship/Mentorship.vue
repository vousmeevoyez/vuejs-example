<template>
  <el-container>
    <el-col>
      <el-tabs type="card">
        <el-tab-pane label="Discover">
          <DiscoverTab :mentors="mentors" />
        </el-tab-pane>
        <el-tab-pane label="Appointment">
          <AppointmentTab :appointments="appointments" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-container>
</template>
<script>
import DiscoverTab from "./components/DiscoverTab.vue";
import AppointmentTab from "./components/AppointmentTab.vue";

export default {
  name: "DreamImplementation",
  components: {
    AppointmentTab,
    DiscoverTab
  },
  data() {
    return {
      mentor_title: "My Mentor",
      mentors: [
        {
          id: 1,
          name: "Steve Roger",
          status: "AVAILABLE",
          image: "https://i.ebayimg.com/images/g/7sUAAOSw7j5bJzDy/s-l400.jpg"
        },
        {
          id: 2,
          name: "Steve Roger",
          status: "NOT_AVAILABLE",
          image: "https://i.ebayimg.com/images/g/7sUAAOSw7j5bJzDy/s-l400.jpg"
        }
      ],
      appointments: [
        {
          id: 1,
          name: "Steve Roger",
          image: "https://i.ebayimg.com/images/g/7sUAAOSw7j5bJzDy/s-l400.jpg",
          date: "2019-12-12",
          time: "12.00 - 14.00"
        },
        {
          id: 2,
          name: "Steve Roger",
          image: "https://i.ebayimg.com/images/g/7sUAAOSw7j5bJzDy/s-l400.jpg",
          date: "2019-12-13",
          time: "12.00 - 14.00"
        }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
