<template>
  <el-card>
    <div
      slot="header"
      style="display:flex; justify-content: space-between;
 "
    >
      <h1>Backlog</h1>
      <el-button style="float: right; padding-top: 3px;" type="text"
        >See All</el-button
      >
    </div>
    <el-row>
      <CardItem
        v-for="(backlog, index) in backlogs"
        :key="index"
        :card_key="card_key"
        :data="backlog"
        :colors="colors"
      />
    </el-row>
  </el-card>
</template>
<script>
import CardItem from "@/components/CardItem.vue";

export default {
  name: "Backlog",
  components: {
    CardItem
  },
  props: {
    backlogs: Array
  },
  data() {
    return {
      card_key: "status",
      colors: {
        PENDING: "#f1c40f",
        IN_PROGRESS: "#f39c12",
        COMPLETED: "#2ecc71"
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss"></style>
