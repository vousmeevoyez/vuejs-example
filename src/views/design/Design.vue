<template>
  <el-container>
    <el-col>
      <el-tabs v-model="activeTabs" type="card">
        <el-tab-pane label="Design" name="design">
          <el-col v-if="dream.url !== ''">
            <img :src="`${dream.url}`" style="width:1024px; height:auto;" />
          </el-col>
          <el-col v-else>
            <p>{{ $t("design.instruction") }}</p>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Roadmap" name="roadmap">
          <RoadmapTab />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-container>
</template>
<script>
import RoadmapTab from "./components/RoadmapTab.vue";

export default {
  name: "DreamDesign",
  components: {
    RoadmapTab
  },
  data() {
    return {
      activeTabs: "design",
      dream: this.$store.state.dream
    };
  }
};
</script>
