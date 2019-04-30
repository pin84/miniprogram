// components/epsoide/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    index: {
      type:String,
      // 此处设置_index的值用微信新的api wxs更好，
      observer:function(newVal,oldVal,changePath){
        let val = newVal < 10 ? '0'+newVal : newVal
        this.setData({
          _index : val
        })
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: Number,
    month: String,
    _index:'' 
  },

  attached(){
    let date = new Date()
    let year = date.getFullYear()
    let month =date.getMonth() 
    this.setData({
      year,
      month:this.data.months[month]
    })
  },
  
  /**
   * Component methods
   */
  methods: {

  }
})