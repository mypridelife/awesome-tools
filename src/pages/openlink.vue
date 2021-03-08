<!--
  功能: 功能描述
  作者: gyh
-->
<template>
  <div class="page-container">
    <div>{{ link }}---{{ code }}</div>
    <webview id="baiduyun" :src="link" :preload="path"></webview>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  watch: {},
  created() {
    this.link = this.$route.query.link
    this.code = this.$route.query.code
    this.path = `file:${require('path').resolve('src/utils', './baiduyun.js')}`
  },
  mounted() {
    const webview = document.querySelector('#baiduyun')
    webview.addEventListener('did-stop-loading', () => {
      console.log('did-stop-loading')
      //   webview.openDevTools()
      setTimeout(() => {
        this.$router.push({
          name: 'GetLink',
        })
      }, 15000)
    })
  },
  methods: {},
}
</script>

<style scoped type="text/css">
.page-container {
  padding: 50px;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
#baiduyun {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>
