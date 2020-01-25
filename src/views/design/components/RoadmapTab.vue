<template>
  <el-container>
    <el-col>
      <el-row style="padding-bottom:15px;">
        <h1>Your Schedule</h1>
        <el-col>
          <el-table
            :data="schedules"
            style="width: 100%"
            stripe
            default-expand-all
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <div v-for="(task, index) in props.row.tasks" :key="index">
                  <el-row>
                    <p>{{ task.description }}</p>
                    <p>Start: {{ task.start }}</p>
                    <p>End: {{ task.end }}</p>
                  </el-row>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Goal" prop="goal"> </el-table-column>
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
    schedules: Array,
    calendars: Array
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
  }
};
</script>
<style lang="scss"></style>
