<template>
  <el-container>
    <Navbar :user="user" :isCollapse="isCollapse" />
    <el-container direction="vertical">
      <Header :user="user" :menuToggle="menuToggle" />
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
      <!--<el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Base",
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    ...mapActions(["getUserInfo", "triggerError"]),
    menuToggle() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    const userId = Vue.$cookies.get("userId");
    this.getUserInfo(userId)
      .then(data => {})
      .catch(({ error }) => {
        this.triggerError(error);
      });
  }
};
</script>
<style>
.el-container {
  height: 100vh;
}

body {
  margin: 0;
}
</style>
