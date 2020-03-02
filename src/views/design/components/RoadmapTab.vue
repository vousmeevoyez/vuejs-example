<template>
  <el-container>
    <el-col>
      <el-row>
        <el-col :span="12" style="padding-right:10px;">
          <el-card>
            <div slot="header">
              <h4>Your Schedule</h4>
            </div>
            <el-table
              v-loading="loading"
              :data="dream.quests"
              style="width: 100%"
              stripe
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    :data="props.row.tasks"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                  >
                    <el-table-column label="Legend" prop="color" width="100px">
                      <template slot-scope="scope">
                        <div :style="markTask(scope.row.color)"></div>
                      </template>
                    </el-table-column>
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
        </el-col>
        <el-col :span="12">
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
          columns: 1,
          rows: 3
        },
        // min-width 1024px
        lg: {
          columns: 1,
          rows: 3
        },
        // min-width 1280px
        xl: {
          columns: 3,
          rows: 3,
          isExpanded: true
        }
      });
    }
  },
  methods: {
    ...mapActions(["getUserRoadmap", "triggerError"]),
    markTask(color) {
      let style = `width: 20px; height: 20px; background-color: ${color}`;
      return style;
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
