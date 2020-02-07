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
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Base",
  components: {
    Header,
    Navbar
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    menuToggle() {
      this.isCollapse = !this.isCollapse;
    }
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
