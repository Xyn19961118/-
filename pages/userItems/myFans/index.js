// pages/userItems/myFans/index.js
import { UserModel } from '../../../models/userModel';
const UserModels = new UserModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    number: 0,
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    UserModels.getFocusMeUser(1, res => {
      this.setData({
        data: res.data,
        number: res.total
      })
    })
  },
  lower(e) {
    let { page, data } = this.data
    UserModels.getFocusMeUser(page, res => {
      if (res.data.length > 0) {
        data.push(...res.data)
        this.setData({
          data: data,
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
  unFocus(e) {
    UserModels.getUserFocusStatus(e.detail, res => {
      wx.showToast({
        duration: 1500
      });
    })
  }
})