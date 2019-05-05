// components/img-button/img-button.js
Component({
  /**
   * Component properties
   */
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onGetUserInfo(e){
      this.triggerEvent('getuserinfo',e.detail,{})
    }
  }
})