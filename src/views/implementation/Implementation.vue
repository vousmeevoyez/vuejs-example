<template>
  <el-container>
    <el-col>
      <el-tabs type="card">
        <el-tab-pane label="Workflow">
          <WorkflowTab
            :backlogs="backlogs"
            :todos="todos"
            :doings="doings"
            :dones="dones"
          />
        </el-tab-pane>
        <el-tab-pane label="Allocation">
          <AllocationTab :actual="actual" :target="target" />
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
      backlogs: [
        {
          id: 1,
          goal_id: "goal_1",
          description: "something backlogs 1",
          date: "2019-12-29"
        }
      ],
      todos: [
        {
          id: 1,
          goal_id: "goal_2",
          description: "something todos 1",
          date: "2019-12-29"
        }
      ],
      doings: [
        {
          id: 1,
          goal_id: "goal_2",
          description: "something doing 1",
          date: "2019-12-29"
        }
      ],
      dones: [
        {
          id: 1,
          goal_id: "goal_4",
          description: "something done 1",
          date: "2019-12-29"
        }
      ],
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
<style lang="scss"></style>
