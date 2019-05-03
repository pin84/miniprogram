// components/search/search.js
import {
  KeywordModel
} from '../../models/search.js'
import {
  BookModel
} from '../../models/book.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    history: [],
    hotSearch: [],
    searchResult: [],
    isSearch:false,
    q:''//用户搜索的内容，显示在input框中
  },

  attached() {
    const history = keywordModel.getHistory()
    const hotHistory = keywordModel.getHot()

    this.setData({
      history
    })

    hotHistory.then(res => {
      this.setData({
        hotSearch: res.hotSearch
      })
    })
  },

  /**
   * Component methods
   */
  methods: {
    closeSearch() {
      this.triggerEvent('closeSearch', {}, {})
    },

    searchBook(e) {
      let searchWord = e.detail.value || e.detail.text
      if (!searchWord){
        wx.showToast({
          title: '不能搜索空文本',
          icon: 'none'
        })
        return
      }
      //设置到历史搜索
      keywordModel.setHistory(searchWord)
      //向服务器发送请求,一发请求就隐藏列表页面，展现搜索页面
      this.setData({
        isSearch: true
      })
      bookModel.searchBooks(searchWord).then(res => {
        this.setData({
          searchResult:res.books,
          q: searchWord
        })
      })
    },
    onDelete(){
      this.setData({
        isSearch:false
      })
    },


  }
})