//index.js
//获取应用实例
const app = getApp()

import {
  MagazineModel
} from '../../models/magazine.js'
let magazine = new MagazineModel()

import {
  LikeModel
} from '../../models/like.js'
let likeModel = new LikeModel()

Page({
  data: {
    magazine: null,
    latest: true,
    first: false,
    latestNum: undefined //保存最新一期的num
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    magazine.getLatest((res) => {
      this.setData({
        magazine: res.result[0],
        latestNum: res.result[0].num,
      })
    })

  },

  likeOrCancel(e) {
    let id = this.data.magazine.id
    let num = this.data.magazine.num
    wx.removeStorageSync('maga-'+num) //修改了状态之后，删除缓存，下次从数据库读取信息，并再次写入缓存 
    let behavior = e.detail.behavior
    likeModel.like(id, behavior)
  },
  onNext() {
    let index = this.data.magazine.num
    index++
    if (index === this.data.latestNum) {
      this.setData({
        latest: true
      })
    }
    this._getMagazine(index)
    this.setData({
      first: false
    })
  },
  onPrevious() {
    let index = this.data.magazine.num
    index--
    if (index === 1) {
      this.setData({
        first: true
      })
    }
    this._getMagazine(index)
    this.setData({
      latest: false
    })
  },

  _getMagazine(index) {
    magazine.getByIndex(index, (res) => {
      this.setData({
        magazine: res
      })
    })
  }


})