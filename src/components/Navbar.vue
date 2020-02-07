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
      <el-col :offset="6" class="image-cropper">
        <img :src="`${user.image}`" v-if="isCollapse === false" />
      </el-col>
    </el-row>
    <el-row>
      <el-col v-if="isCollapse === false">
        <p>{{ user.firstName }} {{ user.lastName }}</p>
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
        <!--<i :class="rule.icon"></i>-->
        <span> {{ rule.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    isCollapse: Boolean,
    user: Object
  },
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
  width: 200px%;
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

.image-cropper {
  width: 125px;
  height: 125px;
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
