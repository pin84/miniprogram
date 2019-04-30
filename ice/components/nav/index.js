// components/nav/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * Component initial data
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * Component methods
   */
  methods: {
    onLeft() {
     
      if (!this.properties.latest) {
        this.triggerEvent('onNext', {}, {})
      }
    },
    onRight() {
      
      if (!this.properties.first) {
        this.triggerEvent('onPrevious', {}, {})
      }
    }
  }
})