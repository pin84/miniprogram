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
    wx:wx.showLoading({
      title: '正在加载...',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    const id = options.id
    const detail = bookModel.getDetailById(id)
    const comments = bookModel.getCommentsByBid(id)
    Promise.all([detail, comments]).then(res =>{
      this.setData({
        book: res[0].detail,
        comments: res[1].comments
      })
      wx.hideLoading()
    })

    //以下两个方法可以用Promise.all([])代替
    // detail.then(res => {
    //   this.setData({
    //     book: res.detail
    //   })
    // })
    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
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
    let comment = e.detail.text || e.detail.value
    let bid = this.data.book.id
    
    if(!comment){
      return
    }
    if(comment.length > 12){
      wx.showToast({
        title: '最多不能超过12个字 ',
        icon: 'none'
      })
    }

    this.data.comments.unshift({
      content: comment,
      fav_num: 1
    })

    
    bookModel.postComment(bid, comment).then(res => {
      this.setData({
        comments: this.data.comments,
        isShowInput:false
      })

      wx.showToast({
        title: '+1',
        icon: 'none'
      })


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