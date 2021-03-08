;(async function() {
  function sleep(wait) {
    return new Promise(resolve => setTimeout(resolve, wait * 1000))
  }

  const 全选 =
    '#shareqr > div.KPDwCE > div.QxJxtg > div > ul.QAfdwP.tvPMvPb > li.fufHyA.yfHIsP > div > span.zbyDdwb'
  const 保存到网盘 =
    '#bd-main > div > div.module-share-header > div > div.slide-show-right > div > div > div.x-button-box > a.g-button.tools-share-save-hb.g-button-blue > span'
  const 我的资源 =
    '#fileTreeDialog > div.dialog-body > div > ul > li > ul > li:nth-child(5) > div > span > span'
  const 确定 =
    '#fileTreeDialog > div.dialog-footer.g-clearfix > a.g-button.g-button-blue-large'

  function _trigger(selector) {
    const triggerDom = document.querySelector(selector)
    triggerDom.click()
  }

  await sleep(3)
  _trigger(全选)
  await sleep(1)
  _trigger(保存到网盘)
  await sleep(1)
  _trigger(我的资源)
  await sleep(1)
  _trigger(确定)
  await sleep(1)
})()
