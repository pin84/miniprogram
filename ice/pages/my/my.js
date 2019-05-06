// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount:0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.userAuthorized()
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              // console.log(data.userInfo)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }

      }
    })
  },
  onGetuserinfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
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