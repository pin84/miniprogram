// components/book_item/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    book:Object
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
    ontap(){
      const id = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book_detail/index?id=${id}`,
      })
    }
  }
})
