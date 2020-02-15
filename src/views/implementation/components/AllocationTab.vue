<template>
  <el-col>
    <el-row>
      <el-col :span="12">
        <el-row justify="center">
          <h1>Actual</h1>
          <apexchart
            width="100%"
            type="donut"
            :options="actual.options"
            :series="actual.data"
            :labels="actual.labels"
          ></apexchart>
        </el-row>
      </el-col>
      <el-col :span="12">
        <h1>Implementation</h1>
        <apexchart
          width="100%"
          type="donut"
          :options="target.options"
          :series="target.data"
          :labels="target.labels"
        ></apexchart>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
export default {
  name: "RoadmapTab",
  props: {
    target: Object,
    actual: Object
  }
};
</script>
<style lang="scss"></style>
