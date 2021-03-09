<!--
  功能: 功能描述
  作者: gyh
-->
<template>
  <div class="page-container">
    <div>{{ link }}===={{ code }}</div>
    <webview id="baiduyun" :src="link" :preload="path"></webview>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      link: '',
      code: '',
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
    webview.addEventListener('did-stop-loading', () => {
      console.log('did-stop-loading')
      //   webview.openDevTools()
    })
  },
  activated() {
    console.log('open-activated')

    this.link = this.$route.query.link
    this.code = this.$route.query.code
    this.way = this.$route.query.way

    if (this.way === 'manual') return

    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.$router.push({
        name: 'GetLink',
      })
    }, 20000)
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
