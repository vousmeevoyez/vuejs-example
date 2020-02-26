<template>
  <el-card style="padding-bottom:10px" shadow="hover" :style="markCard(data)">
    <el-row style="padding-bottom:10px">
      {{ data.description }}
    </el-row>
    <!--<el-row type="flex" justify="space-between">
      <el-col :span="6" v-if="'tag' in data">
        <el-button type="plain" size="small" round>{{ data.tag }}</el-button>
      </el-col>
      <el-col :span="6" v-if="'due_date' in data">
        <el-button type="plain" size="small" round>{{
          data.due_date | humanDate
        }}</el-button>
      </el-col>
		</el-row>-->
    <el-row type="flex" justify="center">
      <el-col v-if="data.due_date">
        <el-button type="plain" size="small" round>{{
          data.due_date | humanDate
        }}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="flex-end" style="padding-top:10px;">
      <el-col :offset="18" :span="6">
        <el-button
          type="danger"
          icon="el-icon-close"
          size="mini"
          circle
          @click="triggerDelete(data)"
        ></el-button>
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
    },
    triggerDelete(card) {
      // emit delete to parent
      this.$emit("deletion", card);
    }
  }
};
</script>
<style lang="scss"></style>
