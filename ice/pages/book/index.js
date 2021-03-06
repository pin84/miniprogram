// pages/book/index.js
import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()

Page({

  /**
   * Page initial data
   */
  data: {
    books: [],
    isShowSearch: false,
    showMore:0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    const books = bookModel.getHotList()
    books.then(res => {
      this.setData({
        books: res.result
      })

    })
  },
  search() {
    this.setData({
      isShowSearch: true
    })
  },

  closeSearch() {
    this.setData({
      isShowSearch: false
    })
  },

  onReachBottom() {
    this.setData({
      showMore:(new Date()).getTime()
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
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})