<template>
  <el-container>
    <el-col>
      <el-row>
        <el-col>
          <NorthStar :northStar="northStar" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="12">
          <el-card>
            <h3>DreamDiagnostic</h3>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h3>DreamGPS Design</h3>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h3>DreamGPS Implementation</h3>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h3>Power Mentorship</h3>
          </el-card>
        </el-col>
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
