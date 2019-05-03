import {
  HTTP
} from '../utils/http_p.js'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: '/initData'
    })
  }
  getDetailById(id) {
    return this.request({
      url: `/book_detail?id=${id}`
    })
  }

  getCommentsByBid(bid) {
    return this.request({
      url: `/comments?bid=${bid}`
    })
  }

  postComment(bid, comment) {
    return this.request({
      url: `/addComment`,
      method: 'POST',
      data: {
        bid:bid,
        content:comment
      }
    })
  }

  searchBooks(keyword){
    return this.request({
      url: `/sByKeyword?keyword=${keyword}`
    })
  }



}

export {
  BookModel
}