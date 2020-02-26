<template>
  <el-col>
    <el-row>
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
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import { mapActions } from "vuex";
import { colorToHex } from "@/utility/utils";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

export default {
  name: "AllocationTab",
  methods: {
    ...mapActions(["getUserAllocation", "triggerError"]),
    fetchData() {
      const userId = this.$store.getters["userId"];
      this.getUserAllocation(userId)
        .then(data => {
          const allocation = this.$store.state.implementation.allocation;
          const colors = allocation.colors.map(x => colorToHex(x));

          this.chartOptions.labels = allocation.labels;
          this.chartOptions.colors = colors;
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
        labels: [],
        colors: []
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
