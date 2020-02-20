<template>
  <el-container>
    <el-col>
      <el-tabs v-model="activeTabs" type="card" @tab-click="handleChangeTabs">
        <el-tab-pane label="Workflow" name="WorkflowTab">
          <component :is="activeTabs" />
        </el-tab-pane>
        <el-tab-pane label="Allocation" name="AllocationTab">
          <component :is="activeTabs" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-container>
</template>
<script>
import WorkflowTab from "./components/WorkflowTab.vue";
import AllocationTab from "./components/AllocationTab.vue";

export default {
  name: "DreamImplementation",
  components: {
    WorkflowTab,
    AllocationTab
  },
  data() {
    return {
      activeTabs: "WorkflowTab"
    };
  },
  methods: {
    handleChangeTabs(tab, event) {
      this.activeTabs = tab.name;
    }
  }
};
</script>
<style></style>
