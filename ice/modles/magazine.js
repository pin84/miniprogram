import {
  HTTP
} from '../utils/http.js'

class MagazineModel extends HTTP {
  getLatest(cb) {
    this.request({
      url: '/',
      success: (res) => {
        cb(res)
      }
    })
  }
  getByIndex(index, cb) {
    //取数据时，先从缓存里寻找数据 ，如果有，则不从服务器取
    let magazine = wx.getStorageSync('maga-' + index)
    if (!magazine) {
      this.request({
        url: '/getByIndex?index=' + index,
        success: (res) => {
          let data = res.result[0]
          wx.setStorageSync('maga-'+index, data)
          cb(data)
        }
      })
    } else {
      cb(magazine)
    }
  }
}

export {
  MagazineModel
}