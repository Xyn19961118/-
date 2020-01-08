// pages/newIndex/index.js
import { indexModel } from '../../models/indexModel.js'
const indexModels = new indexModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    activity: [],
    searchStatus: false, //搜索组件获取的值
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载数据中...',
      mask: true
    })
    let bgList = this.data.bgList
    indexModels.category(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          list: res.category,
          activity: res.activity
        })
      }
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
  onHide: function() {
    this.setData({
      searchStatus: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  //显示搜素框
  showSearch(e) {
    this.setData({
      searchStatus: true
    })
  },

  //获取搜索子组件传过来的false
  onGetStatus(e) {
    this.setData({
      searchStatus: e.detail
    })
  },
  search(e) {
    let val = e.detail
    wx.navigateTo({
      url: `/pages/searchDetail/index?val=${val}&type=1`
    })
  },
  goToQuiz() {
    wx.navigateTo({
      url: '/pages/topic/index'
    })
  }
})
