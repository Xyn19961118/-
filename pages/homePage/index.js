// pages/homePage/index.js
import { UserModel } from '../../models/userModel'
const UserModels = new UserModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    page: 2,
    info: [],
    list: [],
    topics: [],
    isFocus: 0,
    dataCurr: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    UserModels.getUsersInfo(e.id, res => {
      this.setData({
        info: res.info,
        list: res.Article,
        topics: res.Topics,
        isFocus: res.info.isFocus,
        id: e.id
      })
    }, 1, 10)
  },
  focusMe(e) {
    let id = e.target.dataset.id
    let isFocus = this.data.isFocus
    UserModels.getUserFocusStatus(id, res => {
      UserModels.checkErrorCode(res)
      this.setData({
        isFocus: !isFocus
      })
    })
  },
  handleClick(e) {
    let index = e.target.dataset.curr;
    let currIndex = this.data.dataCurr;
    if (index == currIndex) {
      return false;
    } else {
      this.setData({
        dataCurr: index
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      mask: true,
      success: res => {
        let { id, list, page, topics } = this.data
        this.setData({
          page: page + 1
        })
        UserModels.getUsersInfo(
          id,
          res => {
            if (res.Article.length > 0) {
              list.push(...res.Article)
              topics.push(...res.Topics)
              this.setData({
                list: list,
                topics: topics
              })
              wx.hideLoading()
            } else {
              wx.showToast({
                title: '没有更多了',
                icon: 'none',
                success: result => {
                  wx.hideLoading()
                }
              })
            }
          },
          page,
          10
        )
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})
