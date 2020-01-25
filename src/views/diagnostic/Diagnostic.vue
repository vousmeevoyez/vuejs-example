<template>
  <el-container>
    <el-col>
      <el-card>
        <el-row>
          <vue-friendly-iframe
            :src="url"
            className="iframe"
            @load="onLoad"
          ></vue-friendly-iframe>
        </el-row>
      </el-card>
    </el-col>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      url: "https://spark.adobe.com/page/stDgUOfa3NpeC/"
    };
  }
};
</script>
<style lang="scss">
.iframe {
  width: 100%;
  min-height: 700px;
}
</style>
