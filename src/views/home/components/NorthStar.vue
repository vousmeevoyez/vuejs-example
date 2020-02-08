<template>
  <el-card>
    <div slot="header">
      <h1>{{ $t("home.north_star") }}</h1>
    </div>
    <el-row>
      <el-col> {{ northStar }} </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "NorthStar",
  props: {
    northStar: String
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.north-star {
  font-size: 2rem;
}
</style>
