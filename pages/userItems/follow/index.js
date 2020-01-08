// pages/userItems/follow/index.js
import { UserModel } from "../../../models/userModel.js";
const UserModels = new UserModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCurr: 0,
    followArticle: [],
    prople: [],
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    UserModels.getUserTypeInfo(5, 1, res => {
      this.setData({
        prople: res
      })
    })
  },
  lower(e) {
    let { page, prople } = this.data
    UserModels.getUserTypeInfo(5, page, res => {
      if (res.length > 0) {
        prople.push(...res)
        this.setData({
          prople: prople,
          page: page + 1
        })
      } else {
        UserModels.showMsg('没有更多了')
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取nav的index
  getNavIndex(e) {
    this.setData({
      dataCurr: e.detail
    })
  },
  unFocus(e) {
    UserModels.getUserFocusStatus(e.detail, res => {
      wx.showToast({
        duration: 1500
      });
    })
  }
})