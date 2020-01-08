import { topicModel } from '../../models/topicModel'
let TopicModel = new topicModel()
// pages/topicList/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    dataCurr: 1, //储存导航组件传过来的index
    page: 2,
    id: 0,
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      id: e.id,
      title: e.name
    })
    wx.setNavigationBarTitle({
      title: e.name
    })
    this.publicLoad()
  },
  publicLoad() {
    let id = this.data.id
    let info = wx.getSystemInfoSync()
    let _this = this
    TopicModel.hotTopic(id, res => {
      this.setData({
        hot: res
      })
    })
    TopicModel.topicList(id, 1, res => {
      if (res.length > 0) {
        this.setData({
          items: res,
          id: id
        })
      } else {
        wx.showToast({
          title: '暂时还没有内容',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //获取导航点击的index
  onGetIndex(e) {
    this.setData({
      dataCurr: e.detail.current || e.detail
    })
  },
  createTopic(e) {
    wx.navigateTo({
      url: `/pages/topic/index?id=${this.data.id}&name=${this.data.title}`
    })
  },
  loadMoreTopic(e) {
    let { id, page, items } = this.data
    TopicModel.topicList(id, page, res => {
      if (res.length > 0) {
        items.push(...res)
        this.setData({
          items: items,
          page: page + 1
        })
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  safe_replace: function(str) {
    return str.replace('\\/', '/')
    // str.replace('%20', '')
    // str.replace('%27', '')
    // str.replace('%2527', '')
    // str.replace('*', '')
    // str.replace('"', '&quot;')
    // str.replace("'", '')
    // str.replace('"', '')
    // str.replace(';', '')
    // str.replace('<', '&lt;')
    // str.replace('>', '&gt;')
    // str.replace('{', '')
    // str.replace('}', '')
    // str.replace('\\', '/') //&quot
    // str.replace('&quot', '') //
    return str
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
  onPullDownRefresh: function(e) {
    this.publicLoad()
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
