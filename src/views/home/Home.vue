<template>
  <el-container>
    <el-col>
      <el-row style="padding-bottom: 10px;">
        <el-col :span="12" style="padding-right: 10px;">
          <Goal :data="backlogs" />
        </el-col>
        <el-col :span="12" style="padding-right: 10px;">
          <Backlog :backlogs="backlogs" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="padding-right: 10px;">
          <Card :title="mentor_title" :data="mentors" :direction="direction" />
        </el-col>
        <el-col :span="12" style="padding-right: 10px;">
          <Card :title="mentees_title" :data="mentees" :direction="direction" />
        </el-col>
      </el-row>
    </el-col>
  </el-container>
</template>
<script>
import Backlog from "./components/Backlog.vue";
import Goal from "./components/Goal.vue";

export default {
  name: "Home",
  components: {
    Backlog,
    Goal
  },
  data() {
    return {
      direction: "HORIZONTAL",
      mentor_title: "Mentor",
      mentees_title: "Mentees",
      backlogs: [],
      mentors: [],
      mentees: []
    };
  },
  methods: {
    menuToggle() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="scss"></style>
