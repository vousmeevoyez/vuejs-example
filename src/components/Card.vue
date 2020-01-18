<template>
  <el-card>
    <div
      slot="header"
      style="display:flex; justify-content: space-between;
 "
    >
      <h1>{{ title }}</h1>
      <el-button style="float: right; padding: 3px 0" type="text"
        >See All</el-button
      >
    </div>
    <!-- VERTICAL LAYOUT -->
    <el-row v-if="direction === 'VERTICAL'">
      <el-row
        v-for="(item, index) in data"
        :key="index"
        style="padding-bottom: 10px;"
      >
        <el-col class="section">
          <img :src="item.image" class="section__img" />
          <div class="section__name">
            <p>{{ item.name }}</p>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <!-- HORIZONTAL LAYOUT -->
    <el-row v-else>
      <el-col :span="4" v-for="(item, index) in data" :key="index">
        <el-row>
          <img :src="item.image" class="thumbnail" />
          <p>{{ item.name }}</p>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "Card",
  props: {
    direction: String,
    title: String,
    data: Array
  },
  methods: {}
};
</script>
<style lang="scss">
.thumbnail {
  height: 80px;
  border-radius: 50%;
}
</style>
