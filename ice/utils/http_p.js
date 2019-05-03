import {
  config
} from '../config.js'

class HTTP {
  request({url,data={},method='GET'}){

    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }

  _request(url,resolve,reject,data={},method='GET') {
    wx.request({
      url: config.base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        //startsWith
        //endsWith
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
         resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(err)
      }
    })
  }

  _show_error(error_code){
    console.log(error_code)
        wx.showToast({
            title: 'error', 
            icon:'none',
            duration:2000
        }) 
    }
}

export {
  HTTP
}