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
        <sui-input placeholder="请输入源目录" class="label-input" v-model="oldPath" />
        <sui-label basic color="red" pointing="left" v-show="oldPathError !== ''">
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
      <div class="m-message" v-show="isFinish">
        <sui-accordion exclusive styled>
          <sui-accordion-title>
            <sui-icon name="dropdown" />
            共有{{ totalCount }}个文件，处理了{{ finalArr.length }}个
          </sui-accordion-title>
          <sui-accordion-content>
            <sui-form>
              <sui-form-field>
                <textarea v-model="totalInput"></textarea>
              </sui-form-field>
            </sui-form>
          </sui-accordion-content>
        </sui-accordion>
      </div>
    </div>
    <div class="list-container">
      <sui-list>
        <sui-list-item v-for="(item, index) in finalArr" :key="item.name">
          <sui-button @click="handleOpenLink(item, index)" :primary="linkIndex === index">
            {{ index }}
          </sui-button>
          <sui-button @click="handleCopy(item.link)">
            {{ item.link }}
          </sui-button>
          <sui-button @click="handleCopy(item.code)">
            {{ item.code }}
          </sui-button>
        </sui-list-item>
      </sui-list>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
const jsqr = require('jsqr')
const PNG = require('pngjs').PNG
const { clipboard, shell } = require('electron')

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      //处理前
      oldPath: localStorage.getItem('getLink-oldPath')
        ? localStorage.getItem('getLink-oldPath')
        : '',
      oldPathError: '',

      // 处理中
      isDoing: false,

      // 处理成功
      isFinish: false,
      isTaskFinish: false,
      totalCount: 0,

      finalArr: [],
      totalInput: '',
      // 点击的位置
      linkIndex: '',
    }
  },
  computed: {},
  watch: {
    oldPath() {
      this.oldPathError = ''
    },
  },
  created() {},
  mounted() {
    console.log('get-mounted')
  },

  methods: {
    init() {
      this.$setLocal('getLink-oldPath', this.oldPath)
      this.isDoing = true
      this.isFinish = false
      this.isTaskFinish = false
      this.totalCount = 0
      this.finalArr = []
    },
    handleAnalyze() {
      const oldPath = this.oldPath
      if (oldPath === '') {
        this.oldPathError = '目录不存在'
        return
      }
      console.log('源目录:', oldPath, fs)
      // 重置数据
      this.init()

      this._analyze(oldPath)
    },
    /**
     * 主要函数-处理
     */
    _analyze(oldPath) {
      try {
        let fileDirArr = fs.readdirSync(oldPath, { withFileTypes: true })
        for (let index = 0; index < fileDirArr.length; index++) {
          //找到符合所选格式文件
          const file = fileDirArr[index]
          if (!file.name.endsWith('.png')) continue
          console.log('file', file)

          const deepPath = oldPath + '/' + file.name
          this.totalCount += 1

          try {
            this._getLink(deepPath, file)
          } catch (error) {
            console.log('analyze failed!!!', file, error)
            this.oldPathError = error
          }
        }
      } catch (error) {
        console.log(error)
        this.oldPathError = error
      } finally {
        this.isDoing = false
        this.isFinish = true
        this.getTotalInput()
      }
    },
    //解析文件
    _getLink(path, file) {
      try {
        const data = fs.readFileSync(path)
        var png = PNG.sync.read(data)

        const code = jsqr(png.data, png.width, png.height)
        if (code) {
          console.log('Found QR code', code.data)
          // 保存进展示数组

          const item = {
            name: file.name,
            link: code.data,
            code: file.name.slice(file.name.length - 8, file.name.length - 4),
          }
          this.finalArr.push(item)
        }
      } catch (err) {
        console.error(err)
      }
    },
    handleOpenLink(item, index) {
      this.linkIndex = index
      // 转换link
      const link = item.link.trim()
      const finalLink =
        'https://pan.baidu.com/share/init?surl=' +
        link.split('/s/')[1].slice(1) +
        '&code=' +
        item.code.trim()

      clipboard.writeText(finalLink.trim(), 'finalLink')

      shell.openExternal(finalLink)
    },
    handleCopy(text) {
      clipboard.writeText(text.trim(), text)
    },
    getTotalInput() {
      const result = this.finalArr.map(item => {
        const finalLink =
          'https://pan.baidu.com/share/init?surl=' +
          item.link
            .trim()
            .split('/s/')[1]
            .slice(1) +
          '&code=' +
          item.code.trim()
        return finalLink
      })
      this.totalInput = JSON.stringify(result)
    },
  },
}
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
.m-message {
  margin-top: 20px;
}
.list-container {
  margin-top: 20px;
}
</style>
