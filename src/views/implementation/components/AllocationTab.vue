<template>
  <el-col>
    <el-row>
      {{ allocation }}
      <el-col :span="12">
        <el-row justify="center">
          <h1>Actual</h1>
          <apexchart
            v-if="chartOptions.labels.length"
            width="100%"
            type="donut"
            :options="chartOptions"
            :series="actual.data"
          ></apexchart>
        </el-row>
      </el-col>
      <el-col :span="12">
        <h1>Target</h1>
        <apexchart
          v-if="chartOptions.labels.length"
          width="100%"
          type="donut"
          :options="chartOptions"
          :series="target.data"
        ></apexchart>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AllocationTab",
  methods: {
    ...mapActions(["getUserAllocation", "triggerError"]),
    fetchData() {
      this.getUserAllocation()
        .then(data => {
          const allocation = this.$store.state.implementation.allocation;

          this.chartOptions.labels = allocation.labels;
          this.actual.data = allocation.actuals;
          this.target.data = allocation.targets;
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    }
  },
  mounted() {
    this.fetchData();
    // const allocation = this.$store.state.implementation.allocation;
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "donut"
        },
        labels: []
      },
      actual: {
        data: []
      },
      target: {
        data: []
      }
    };
  }
};
</script>
