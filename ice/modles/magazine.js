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
}

export {
  MagazineModel
}