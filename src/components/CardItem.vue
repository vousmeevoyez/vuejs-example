<template>
  <el-card style="padding-bottom:10px" shadow="hover" :style="markCard(data)">
    <el-row style="padding-bottom:10px">
      {{ data.description }}
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="6" v-if="'tag' in data">
        <el-button type="plain" size="small" round>{{ data.tag }}</el-button>
      </el-col>
      <el-col :span="6" v-if="'date' in data">
        <el-button type="plain" size="small" round>{{ data.date }}</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "CardItem",
  props: {
    card_key: String,
    data: Object,
    colors: Object
  },
  methods: {
    markCard(data) {
      // based on selected key we use passed colors as the style
      let color = this.colors[data[this.card_key]].color;
      let style = `border-top: 9px solid ${color}`;
      return style;
    }
  }
};
</script>
<style lang="scss"></style>
