<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
    :default-active="activeLink"
  >
    <el-row>
      <el-col>
        <img
          src="@/assets/images/dg-logo.png"
          class="nav-logo"
          v-if="isCollapse === false"
        />
        <img
          src="@/assets/images/circle-logo.png"
          class="nav-logo-mobile"
          v-if="isCollapse === true"
        />
      </el-col>
    </el-row>
    <el-row>
      <img
        src="https://i.ebayimg.com/images/g/7sUAAOSw7j5bJzDy/s-l400.jpg"
        class="profile-img"
        v-if="isCollapse === false"
      />
    </el-row>
    <el-row>
      <el-col v-if="isCollapse === false">
        <i class="el-icon-star-on"></i>
        <span class="dream-info"> Chief Technology Officer </span>
        <el-tooltip
          class="item"
          effect="dark"
          content="Hello World!"
          placement="top-start"
        >
          <i class="el-icon-question"></i>
        </el-tooltip>
        <el-progress
          :percentage="50"
          :color="dream_progress_percent"
          class="dream-progress"
        ></el-progress>
      </el-col>
    </el-row>
    <template v-for="(rule, index) in $router.options.routes">
      <el-submenu
        v-if="rule.children && rule.children.length > 0 && rule.meta.visible"
        :index="rule.path"
        :key="index"
      >
        <template slot="title"
          ><i :class="rule.icon"></i>{{ rule.title }}</template
        >
        <el-menu-item
          v-for="(child, child_index) in rule.children"
          :index="rule.path + '/' + child.path"
          :key="child_index"
          >{{ child.title }}</el-menu-item
        >
      </el-submenu>
      <el-menu-item
        v-else-if="rule.meta.visible"
        :index="rule.path"
        :key="index"
      >
        <i :class="rule.icon"></i>
        <span> {{ rule.name }}</span>
      </el-menu-item>
    </template>
    <!--<el-menu-item index="2">
      <i class="el-icon-platform-eleme"></i>
      <span>DreamDiagnostic</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-discover"></i>
      <span>DreamGPSDesign</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-location"></i>
      <span>DreamGPSImplementation</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-s-opportunity"></i>
      <span>Power Mentorship</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-s-custom"></i>
      <span>DreamConnect</span>
		</el-menu-item>-->
  </el-menu>
</template>
<script>
export default {
  name: "Navbar",
  props: ["isCollapse"],
  mounted() {
    this.activeLink = this.$route.path;
  },
  watch: {
    $route(newVal, oldVal) {
      this.activeLink = newVal.path;
    }
  },
  data() {
    return {
      dream_progress_percent: "green"
    };
  }
};
</script>
<style scoped>
.el-aside {
  width: auto;
}

.nav-logo {
  padding-top: 10px;
  width: 150px;
}

.nav-logo-mobile {
  padding-top: 10px;
  width: 45px;
}

.profile-img {
  width: 100px;
  border-radius: 50%;
  padding: 10px 10px;
}

.profile-img-mobile {
  width: 45px;
  border-radius: 50%;
}

.dream-info {
  font-size: 12px;
}

.dream-progress {
  padding: 0 0 12px 12px;
}

.el-icon-start-on {
  color: #006266;
}

.el-menu-item {
  text-align: justify;
}

.el-menu-item > i {
  color: #006266;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
</style>
