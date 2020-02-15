<template>
  <el-container>
    <el-col>
      <el-tabs type="card">
        <el-tab-pane label="Workflow">
          <WorkflowTab />
        </el-tab-pane>
        <el-tab-pane label="Allocation">
          <AllocationTab />
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
      actual: {
        data: [10, 20, 20, 50],
        options: {
          chart: {
            id: "actual-allocation-dount"
          },
          labels: ["Entertainment", "Study", "Exercise", "Social", "Etc"]
        }
      },
      target: {
        data: [15, 15, 15, 55],
        options: {
          chart: {
            id: "target-allocation-dount"
          },
          labels: ["Entertainment", "Study", "Exercise", "Social", "Etc"]
        }
      }
    };
  }
};
</script>
<style></style>
