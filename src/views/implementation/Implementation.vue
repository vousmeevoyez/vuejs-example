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
        },
        {
          id: 2,
          goal_id: "goal_2",
          description: "something backlogs 2",
          date: "2019-12-29"
        },
        {
          id: 3,
          goal_id: "goal_3",
          description: "something backlogs 3",
          date: "2019-12-29"
        },
        {
          id: 4,
          goal_id: "goal_4",
          description: "something backlogs 4",
          date: "2019-12-29"
        }
      ],
      todos: [
        {
          id: 1,
          goal_id: "goal_2",
          description: "something todos 1",
          date: "2019-12-29"
        },
        {
          id: 2,
          goal_id: "goal_3",
          description: "something todos 2",
          date: "2019-12-29"
        },
        {
          id: 3,
          goal_id: "goal_1",
          description: "something todos 3",
          date: "2019-12-29"
        },
        {
          id: 4,
          goal_id: "goal_4",
          description: "something todos 4",
          date: "2019-12-29"
        }
      ],
      doings: [
        {
          id: 1,
          goal_id: "goal_2",
          description: "something doing 1",
          date: "2019-12-29"
        },
        {
          id: 2,
          goal_id: "goal_4",
          description: "something doing 2",
          date: "2019-12-29"
        },
        {
          id: 3,
          goal_id: "goal_1",
          description: "something doing 3",
          date: "2019-12-29"
        },
        {
          id: 4,
          goal_id: "goal_3",
          description: "something doing 4",
          date: "2019-12-29"
        }
      ],
      dones: [
        {
          id: 1,
          goal_id: "goal_4",
          description: "something done 1",
          date: "2019-12-29"
        },
        {
          id: 2,
          goal_id: "goal_3",
          description: "something done 2",
          date: "2019-12-29"
        },
        {
          id: 3,
          goal_id: "goal_1",
          description: "something done 3",
          date: "2019-12-29"
        },
        {
          id: 4,
          goal_id: "goal_2",
          description: "something done 4",
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
