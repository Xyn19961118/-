// pages/news/index.js
import { newsModel } from '../../models/newsModel.js'
let newsModels = new newsModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    newsModels.getCommentList(res => {
      newsModels.checkErrorCode(res)
      this.setData({
        newsList: res
      })
    }, 1)
  },

  onShow: function() {},
  getInfo(e) {
    console.log(e.currentTarget.dataset)
    let { id, type, user, uid } = e.currentTarget.dataset
    let homeId, url
    let init = 0
    if (id == init) {
      if (user == init) {
        homeId = uid
      } else {
        homeId = user
      }
      url = `/pages/homePage/index?id=${homeId}`
    } else {
      if (type == init) {
        url = `/pages/topicDetail/index?&id=${id}`
      } else {
        url = `/pages/detail/index?type=${type}&id=${id}`
      }
    }
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    newsModels.getCommentList(res => {
      this.setData({
        newsList: res
      })
    }, 1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    // console.log(e)
    let { page, newsList } = this.data

    wx.showLoading({
      mask: true
    })
    newsModels.getCommentList(res => {
      if (res.length > 1) {
        newsList.push(...res)
        this.setData({
          newsList,
          page: page + 1
        })
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1500
        })
      }
    }, page)
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
