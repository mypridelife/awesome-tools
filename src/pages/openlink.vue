<!--
  功能: 功能描述
  作者: gyh
-->
<template>
  <div class="page-container">
    <div>{{ link }}</div>
    <webview id="baiduyun" :src="link" :preload="path"></webview>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      link: '',
      way: '',
      timer: '',
    }
  },
  watch: {},
  created() {
    this.path = `file:${require('path').resolve('src/utils', './baiduyun.js')}`
  },
  mounted() {
    const webview = document.querySelector('#baiduyun')
    console.log('open-mounted')
    webview.addEventListener('dom-ready', () => {
      console.log('did-stop-loading')
      // webview.openDevTools()
    })
  },
  activated() {
    console.log('open-activated')

    this.link = this.$route.query.link
    this.way = this.$route.query.way

    if (this.way === 'manual') return

    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.$router.push({
        name: 'GetLink',
      })
    }, 25000)
  },
  deactivated() {
    clearTimeout(this.timer)
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
