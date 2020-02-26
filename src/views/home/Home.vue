<template>
  <el-container>
    <el-col>
      <el-row>
        <el-col>
          <NorthStar :northStar="northStar" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <router-link to="/diagnostic"
          ><el-col :span="12">
            <el-card>
              <h2>
                Dream<span style="color:rgb(16,225,194);">Diagnostic</span>
              </h2>
              <img src="@/assets/images/dg-logo.png" style="width:150px;" />
            </el-card>
          </el-col>
        </router-link>
        <router-link to="/design">
          <el-col :span="12">
            <el-card>
              <h2>
                Dream<span style="color:rgb(16,225,194);">GPS</span
                ><span style="font-size:18px"> Design</span>
              </h2>
              <img src="@/assets/images/dg-logo.png" style="width:150px;" />
            </el-card>
          </el-col>
        </router-link>
        <router-link to="/implementation">
          <el-col :span="12">
            <el-card>
              <h2>
                Dream<span style="color:rgb(16,225,194);">GPS</span
                ><span style="font-size:18px"> Implementation</span>
              </h2>
              <img src="@/assets/images/dg-logo.png" style="width:150px;" />
            </el-card>
          </el-col>
        </router-link>
        <router-link to="/mentorship">
          <el-col :span="12">
            <el-card>
              <h2>
                Power<span style="color:rgb(16,225,194);">Mentorship</span>
              </h2>
              <img src="@/assets/images/dg-logo.png" style="width:150px;" />
            </el-card>
          </el-col>
        </router-link>
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
