// components/like/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    islike: {
      type: Boolean,
      value: true,
      observer: function () {

      }
    },
    count: {
      type: Number,
      value: 8
    }
  },

  /**
   * Component initial data
   */
  data: {
    likePng:'./images/like.png',
    unLikePng:'./images/like@dis.png'
  },

  /**
   * Component methods
   */
  methods: {
    onLike(){
      let islike = this.properties.islike
      let count = this.properties.count
      count = islike ? count - 1 : count + 1
      this.setData({
        count: count,
        islike: !islike
      })
    }
  }
})
