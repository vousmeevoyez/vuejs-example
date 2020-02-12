<template>
  <el-container>
    <el-col>
      <el-tabs type="card">
        <el-tab-pane label="Design">
          <el-col v-if="dream.url !== ''">
            <img :src="`${dream.url}`" style="width:1024px; height:auto;" />
          </el-col>
          <el-col v-else>
            <p>{{ $t("design.instruction") }}</p>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Roadmap">
          <RoadmapTab :quests="dream.quests" :tasks="dream.tasks" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-container>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import RoadmapTab from "./components/RoadmapTab.vue";

export default {
  name: "DreamDesign",
  components: {
    RoadmapTab
  },
  data() {
    return {
      dream: this.$store.state.dream
    };
  },
  mounted() {
    const roadmapId = Vue.$cookies.get("roadmapId");
    this.getUserRoadmap(roadmapId)
      .then(data => {})
      .catch(({ error }) => {
        this.triggerError(error);
      });
  },
  methods: {
    ...mapActions(["getUserRoadmap", "triggerError"])
  }
};
</script>
<style lang="scss"></style>
