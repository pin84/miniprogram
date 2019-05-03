// components/tag/index.js
Component({
  /**
   * Component properties
   */

  options: {
    multipleSlots: true
  },
  externalClasses:['tag-class'],
  properties: {
    text: String
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
    onTap(){
      this.triggerEvent('tapText',{
        text:this.properties.text
      },{})
    }
  }
})