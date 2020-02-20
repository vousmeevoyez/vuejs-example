<template>
  <el-container>
    <el-col>
      <el-card>
        <el-row v-if="diagnostic_info.url !== ''">
          <vue-friendly-iframe
            :src="`${diagnostic_info.url}`"
            className="iframe"
            @load="onLoad"
          ></vue-friendly-iframe>
        </el-row>
        <el-row v-else>
          <p>{{ $t("diagnostic.instruction") }}</p>
        </el-row>
      </el-card>
    </el-col>
  </el-container>
</template>
<script>
import Vue from "vue";
import VueFriendlyIframe from "vue-friendly-iframe";

Vue.use(VueFriendlyIframe);

export default {
  computed: {
    diagnostic_info() {
      return this.$store.state.diagnostic;
    }
  }
};
</script>
<style lang="scss">
.iframe {
  width: 100%;
  min-height: 700px;
}
</style>
