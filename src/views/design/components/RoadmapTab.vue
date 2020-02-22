<template>
  <el-container>
    <el-col>
      <el-row style="padding-bottom:15px;">
        <el-card>
          <div slot="header">
            <h4>Your Schedule</h4>
          </div>
          <el-table
            v-loading="loading"
            :data="dream.quests"
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
            :attributes="dream.tasks"
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
import Vue from "vue";
import VCalendar from "v-calendar";
import { mapActions } from "vuex";

Vue.use(VCalendar, {
  componentPrefix: "vc"
});

export default {
  name: "RoadmapTab",
  data() {
    return {
      loading: true,
      dream: this.$store.state.dream
    };
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
    ...mapActions(["getUserRoadmap", "triggerError"]),
    questRowName({ row, rowIndex }) {
      return "warning-row";
    }
  },
  mounted() {
    const roadmapId = this.$store.getters["roadmapId"];
    this.getUserRoadmap(roadmapId)
      .then(data => {
        this.loading = false;
      })
      .catch(({ error }) => {
        this.triggerError(error);
      });
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
