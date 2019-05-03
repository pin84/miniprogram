import {
  HTTP
} from '../utils/http.js'

class LikeModel extends HTTP {

  like(magazineId, behavior) {
    this.request({
      url: '/like',
      method: 'POST',
      data: {
        id: magazineId,
        behavior: behavior
      }
    })
  }

  bookLikeOrCancel(bookID, behavior) {
    this.request({
      url: '/like',
      method: 'POST',
      data: {
        id: bookID,
        behavior: behavior,
        type:'books'
      }
    })
  }
  

}

export {
  LikeModel
}