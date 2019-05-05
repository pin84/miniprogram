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
    loadMore: {
      type: Number,
      observer: '_load_more'
    }
  },

  /**
   * Component initial data
   */
  data: {
    history: [],
    hotSearch: [],
    searchResult: [],
    isSearch: false,
    q: '', //用户搜索的内容，显示在input框中
    isLoading: false, //当数据还没有返回时，不允许发送第二次请求
    stopLoad: false, //数据已到最后，停止发送请求
    showLoadingOnCenter: false,
    isNullResult: false
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
    _load_more() {
      if (this.data.stopLoad) {
        return
      }
      if (this.data.isLoading) {
        //如果正在请求数据 ，刚不允许再发送请求
        return
      }
      //如果数据请求完成，好么先上锁，再请求，防止下次重复请求
      this.setData({
        isLoading: true
      })
      this._showLoadingOnCenter()
      let length = this.data.searchResult.length
      //这里的length为后台取数据的截止位。这里每次多增加6个数据
      bookModel.searchBooks(this.data.q, length).then(res => {
        let tempArr = this.data.searchResult.concat(res.books)
        this.setData({
          searchResult: tempArr
        })
        //请求完成后解锁
        this.setData({
          isLoading: false
        })
        this._hiddenLoadingOnCenter()
        if (!res.books.length) {
          this.data.stopLoad = true
        }
      }, () => {
        //请求失败后出也解锁
        this.setData({
          isLoading: false
        })
        this._hiddenLoadingOnCenter()
      })
    },

    closeSearch() {
      this.triggerEvent('closeSearch', {}, {})
    },

    searchBook(e) {
      this._showLoadingOnCenter()
      let searchWord = e.detail.value || e.detail.text
      if (!searchWord) {
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
        isSearch: true,
        searchResult: [] //清空之前的搜索
      })
      //从后台取数据 ，默认每次取6个（后台设置），如果要增加取值范围，就多传一个参数，如：bookModel.searchBooks(searchWord,6)，这样则每次会取 6+6=12个数据
      bookModel.searchBooks(searchWord).then(res => {
        this.setData({
          searchResult: res.books,
          q: searchWord
        })
        this._hiddenLoadingOnCenter()
        this._isNullRe(res.books)
      }, () => {
        this._hiddenLoadingOnCenter()
      })
    },

    _isNullRe(result) {
      this.setData({
        isNullResult: result.length ? false : true
      })
    },

    //下两个方法可以合成一个。
    _showLoadingOnCenter() {
      this.setData({
        showLoadingOnCenter: true
      })
    },
    _hiddenLoadingOnCenter() {
      this.setData({
        showLoadingOnCenter: false
      })
    },
    onDelete() {
      this.setData({
        isSearch: false,
        q: '', //删除搜索的keyword
        isNullResult: false
      })
      this.data.stopLoad = false
    },


  }
})