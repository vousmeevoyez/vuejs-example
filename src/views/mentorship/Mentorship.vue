<template>
  <el-container>
    <el-col>
      <el-tabs v-model="activeTabs" type="card" @tab-click="handleChangeTabs">
        <el-tab-pane label="Discover" name="DiscoverTab">
          <component :is="activeTabs" />
        </el-tab-pane>
        <el-tab-pane label="Appointment" name="AppointmentTab">
          <component :is="activeTabs" />
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
      activeTabs: "DiscoverTab"
    };
  },
  methods: {
    handleChangeTabs(tab, event) {
      this.activeTabs = tab.name;
    }
  }
};
</script>
<style lang="scss"></style>
