<template>
  <el-col :span="12" style="padding-right: 15px;">
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
      <el-row>
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
    </el-card>
  </el-col>
</template>
<script>
export default {
  name: "Card",
  props: {
    title: String,
    data: Array
  },
  methods: {}
};
</script>
<style lang="scss">
.section {
  &__img {
    height: 80px;
    border-radius: 50%;
    float: left;
  }
  &__name {
    display: inline;
    margin-left: 15px;
    float: left;
  }
}
</style>
