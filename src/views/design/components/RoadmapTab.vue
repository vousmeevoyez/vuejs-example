<template>
  <el-container>
    <el-col>
      <el-row style="padding-bottom:15px;">
        <h1>Your Schedule</h1>
        <el-col>
          <el-table
            :data="quests"
            style="width: 100%"
            stripe
            :row-class-name="questRowName"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.tasks" stripe>
                  <el-table-column
                    label="Task"
                    prop="description"
                  ></el-table-column>
                  <el-table-column label="Start" prop="start"></el-table-column>
                  <el-table-column label="End" prop="end"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="Goal" prop="description"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <vc-calendar
            :attributes="calendars"
            :columns="layout.columns"
            :rows="layout.rows"
            :is-expanded="layout.isExpanded"
          />
        </el-col>
      </el-row>
    </el-col>
  </el-container>
</template>
<script>
export default {
  name: "RoadmapTab",
  props: {
    quests: Array,
    tasks: Array
  },
  computed: {
    layout() {
      return this.$screens({
        // Default layout for mobile
        default: {
          columns: 3,
          rows: 2,
          isExpanded: true
        },
        // min-width 1024px
        lg: {
          columns: 3,
          rows: 2,
          isExpanded: true
        },
        // min-width 1280px
        xl: {
          columns: 3,
          rows: 2,
          isExpanded: true
        }
      });
    }
  },
  data() {
    return {
      calendars: this.tasks
    };
  },
  methods: {
    questRowName({ row, rowIndex }) {
      return "warning-row";
    }
  }
};
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
