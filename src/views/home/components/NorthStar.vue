<template>
  <el-card class="northStarCard">
    <div slot="header">
      <h1>{{ $t("home.north_star") }}</h1>
    </div>
    <el-row>
      <el-col>
        <strong>{{ northStar }}</strong>
      </el-col>
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
<style>
.north-star {
  font-size: 2rem;
}
.northStarCard > .el-card__header {
  background-color: rgb(16, 225, 194);
}
</style>
