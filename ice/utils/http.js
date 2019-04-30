import {
  config
} from '../config.js'

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        //startsWith
        //endsWith
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
         params.success && params.success(res.data)
        } else {
          wx.showToast({
            title: '错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
}

export {
  HTTP
}