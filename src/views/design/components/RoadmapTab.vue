<template>
  <el-container>
    <el-col>
      <el-row style="padding-bottom:15px;">
        <el-card>
          <div slot="header">
            <h4>Your Schedule</h4>
          </div>
          <el-table
            :loading="loading"
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
                  <el-table-column label="Start">
                    <template slot-scope="scope">
                      {{ scope.row.start | humanDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="End">
                    <template slot-scope="scope">
                      {{ scope.row.end | humanDate }}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="Goal">
              <template slot-scope="scope">
                <strong>{{ scope.row.description }}</strong>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row>
        <el-col>
          <vc-calendar
            :attributes="tasks"
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
          columns: 4,
          rows: 1,
          isExpanded: true
        },
        // min-width 1024px
        lg: {
          columns: 4,
          rows: 1,
          isExpanded: true
        },
        // min-width 1280px
        xl: {
          columns: 4,
          rows: 1,
          isExpanded: true
        }
      });
    }
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
