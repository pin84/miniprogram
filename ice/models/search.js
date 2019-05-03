import {
  HTTP
} from '../utils/http_p.js'

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10
  getHistory() {
    const arrHistory = wx.getStorageSync(this.key)
    return arrHistory ? arrHistory : []
  }

  getHot() {
    return this.request({
      url: '/hot_keyword'
    })
  }

  setHistory(keyword) {
    let arrHistory = this.getHistory()

    const has = arrHistory.includes(keyword)
    if (!has) {
      const length = arrHistory.length
      if (length >= this.maxLength) {
        arrHistory.pop()
      }
      arrHistory.unshift(keyword)
      wx.setStorageSync(this.key, arrHistory)
    }

  }
}

export {
  KeywordModel
}