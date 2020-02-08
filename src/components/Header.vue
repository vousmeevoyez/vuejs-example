<template>
  <el-header>
    <div class="header">
      <el-button class="collapse-toggle" @click="menuToggle()">
        <i class="el-icon-menu"></i>
      </el-button>
      <!--<div class="user-info">
        <p style="font-weight:light;">
          {{ $route.meta.title }}
        </p>
			</div>-->
      <div class="user-info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ user.firstName }} {{ user.lastName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="handleLogout()">Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  props: {
    menuToggle: Function,
    user: Object
  },
  methods: {
    ...mapActions(["logoutUser"]),
    handleLogout() {
      this.logoutUser().then(data => {
        this.$router.push("login");
      });
    }
  }
};
</script>
<style scoped>
.el-button.collapse-toggle {
  border: none;
}

.el-header {
  border-bottom: 1px solid #e6e6e6;
  height: 50px;
}

.header {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

#profile-pic-thumb {
  border-radius: 50%;
}
</style>
