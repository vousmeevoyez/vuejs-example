<template>
  <el-card>
    <div slot="header">
      <h1>North Star</h1>
    </div>
    <el-row>
      <el-progress
        type="circle"
        :percentage="50"
        status="success"
      ></el-progress>
      <p>Patient, Soldier</p>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "Goal",
  props: {
    data: Array
  },
  methods: {}
};
</script>
<style lang="scss"></style>
