import { UserModel } from "../../../models/userModel";
const UserModels = new UserModel();
// pages/userItems/question/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 2,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    UserModels.getUserTypeInfo(e.type, 1, res => {
      if (res.length > 0) {
        this.setData({
          list: res,
          type: e.type
        })
      } else {
        wx.showToast({
          title: '暂时没有内容',
          icon: 'none',
          duration: 1500,
        });
      }
    })
  },

  lower(e) {
    let { page, type, list } = this.data
    UserModels.getUserTypeInfo(type, page, res => {
      if (res.length > 0) {
        list.push(...res)
        this.setData({
          list: list
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

  }
})