<!--
  功能: 功能描述
  作者: gyh
-->
<template>
  <div class="home-page">
    <div class="main-container">
      <div class="file-oldPath">
        <sui-statistic>
          <sui-statistic-label class="label-text">
            源目录
          </sui-statistic-label>
        </sui-statistic>
        <sui-input
          placeholder="请输入源目录"
          class="label-input"
          v-model="oldPath"
        />
        <sui-label basic color="red" pointing="left" v-show="oldPathIsNotExits">
          {{ oldPathError }}
        </sui-label>
      </div>
    </div>
    <div class="foot-container">
      <div class="m-submit">
        <sui-button primary @click="handleAnalyze" :loading="isDoing">
          开始处理
        </sui-button>
      </div>
      <div class="m-message" v-show="isFinish">·······
        <sui-message>
          <sui-message-header>处理完成</sui-message-header>
          <p>一共有{{ totalCount }}个文件,处理了{{ fileCount }}个</p>
        </sui-message>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      //表单数据
      oldPath: localStorage.getItem("oldPath")
        ? localStorage.getItem("oldPath")
        : "",
      oldPathIsNotExits: false,
      oldPathError: "",

      isDoing: false,

      fileCount: 0
    };
  },
  computed: {},
  watch: {
    oldPath(n) {
      this.$setLocal("getLink-oldPath", n);
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 将输入的内容作为默认设置
     */
  }
};
</script>

<style scoped type="text/css">
.home-page {
  position: relative;
}
.main-container {
  display: flex;
  flex-direction: column;
}
.file-oldPath {
  margin-bottom: 20px;
}
.label-text {
  width: 100px;
  text-align: left !important;
}
</style>
