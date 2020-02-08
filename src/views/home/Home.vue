<template>
  <el-container>
    <el-col>
      <el-row>
        <el-col>
          <NorthStar :northStar="northStar" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <!--<el-col>
          <Backlog :backlogs="backlogs" />
				</el-col>-->
      </el-row>
    </el-col>
  </el-container>
</template>
<script>
import NorthStar from "./components/NorthStar.vue";

export default {
  name: "Home",
  components: {
    NorthStar
  },
  computed: {
    northStar() {
      return this.$store.state.profile.northStar;
    }
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
  methods: {}
};
</script>
<style lang="scss"></style>
