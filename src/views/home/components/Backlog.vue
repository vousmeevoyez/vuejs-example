<template>
  <el-col style="padding-right: 10px;">
    <el-card>
      <div
        slot="header"
        style="display:flex; justify-content: space-between;
 "
      >
        <h1>Backlog</h1>
        <el-button style="float: right; padding: 3px 0" type="text"
          >See All</el-button
        >
      </div>
      <el-row>
        <el-row
          v-for="(backlog, index) in backlogs"
          :key="index"
          style="padding-bottom:10px"
        >
          <el-card
            shadow="hover"
            class="backlog-item"
            :class="markBacklog(backlog.status)"
          >
            <el-row style="padding-bottom:10px">
              {{ backlog.description }}
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-button type="plain" size="small" round>{{
                  backlog.date
                }}</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-row>
    </el-card>
  </el-col>
</template>
<script>
export default {
  name: "Backlog",
  props: {
    backlogs: Array
  },
  methods: {
    markBacklog(status) {
      let style = "";
      if (status === "PENDING") {
        style = "pending";
      } else if (status === "IN_PROGRESS") {
        style = "in-progress";
      } else if (status === "COMPLETED") {
        style = "completed";
      }
      return style;
    }
  }
};
</script>
<style lang="scss">
.backlog-item.pending {
  border-top: 9px solid #f1c40f;
}

.backlog-item.in-progress {
  border-top: 9px solid #f39c12;
}

.backlog-item.completed {
  border-top: 9px solid #2ecc71;
}

.backlog-info {
  font-size: 13px;
}
</style>
