import { topicModel } from '../../models/topicModel'
let TopicModel = new topicModel()
// pages/topicTop/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    page: 2,
    dataCurr: 2,
    names: [
      { name: '周榜', curr: 0 },
      { name: '月榜', curr: 1 },
      { name: '总榜', curr: 2 }
    ],
    top: [],
    month: [],
    week: [],
    is_show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    TopicModel.topTopic(1, res => {
      this.setData({
        top: res.top.data,
        month: res.month.data,
        week: res.week.data
      })
    })

    let systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight
    })
  },
  lower(e) {
    let { page, top, month, week } = this.data
    TopicModel.topTopic(page, res => {
      if (
        res.top.data.length > 0 ||
        res.month.data.length > 0 ||
        res.week.data.length > 0
      ) {
        top.push(...res.top.data)
        month.push(...res.month.data)
        week.push(...res.week.data)
        this.setData({
          page: page + 1,
          top: top,
          month: month,
          week: week
        })
      } else {
        TopicModel.showMsg('没有更多了')
      }
    })
  },

  handleClick(e) {
    let index = e.target.dataset.curr
    let currIndex = this.data.dataCurr
    if (index == currIndex) {
      return false
    } else {
      this.setData({
        dataCurr: index
      })
    }
  },
  //搜索显示
  searchShow() {
    this.setData({
      is_show: true
    })
  },
  //搜索隐藏
  returnHandle() {
    this.setData({
      is_show: false
    })
  },
  search(e) {
    let val = e.detail
    wx.navigateTo({
      url: `/pages/searchDetail/index?val=${val}&type=0`
    })
  },
  changeCurr(e) {
    this.setData({
      dataCurr: e.detail.current
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
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    TopicModel.topTopic(1, res => {
      this.setData({
        top: res.top.data,
        month: res.month.data,
        week: res.week.data
      })
    })

    let systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight
    })
    wx.hideLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
