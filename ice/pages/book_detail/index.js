// pages/book_detail/index.js
import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()

import {
  LikeModel
} from '../../models/like.js'
const likeModel = new LikeModel()

Page({

  /**
   * Page initial data
   */
  data: {
    book: Object,
    comments: [],
    isShowInput: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    const id = options.id
    const detail = bookModel.getDetailById(id)
    detail.then(res => {
      this.setData({
        book: res.detail
      })
    })

    const comments = bookModel.getCommentsByBid(id)
    comments.then(res => {
      this.setData({
        comments: res.comments
      })
    })
  },

  likeOrCancel(e) {
    console.log(this.data.book)
    let id = this.data.book.id
    let behavior = e.detail.behavior
    likeModel.bookLikeOrCancel(id, behavior)
  },

  isShowInput() {
    this.setData({
      isShowInput: true
    })
  },
  closeInput() {
    this.setData({
      isShowInput: false
    })
  },
  postText(e) {
    let comment = e.detail.text
    let bid = this.data.book.id
    this.data.comments.unshift({
      content: comment,
      fav_num: 1
    })
    
    bookModel.postComment(bid, comment).then(res =>{
      console.log(res)
    })


    this.setData({
      comments: this.data.comments
    })

    wx.showToast({
      title: '+1',
      icon: 'none'
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})