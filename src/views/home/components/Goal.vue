<template>
  <el-card>
    <div slot="header">
      <h1>{{ $t("home.north_star") }}</h1>
    </div>
    <el-row>
      <el-col :span="12">
        <i class="el-icon-star-off north-star"></i>
      </el-col>
      <el-col :span="12">
        <i class="el-icon-star-off north-star"></i>
      </el-col>
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
<style lang="scss">
.north-star {
  font-size: 2rem;
}
</style>
