import { indexModel } from '../../models/indexModel'
import { UserModel } from '../../models/userModel'
let IndexModel = new indexModel()
let userModel = new UserModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nodes: '',
    id: 0,
    items: [],
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    IndexModel.checkLogin()
    IndexModel.activityRead(options.id, res => {
      this.setData({
        nodes: res.content,
        id: options.id,
        items: res.award_user
      })
    })
  },

  isShow: function() {
    this.setData({
      isShow: !this.data.isShow
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  gotoWen() {
    if (this.data.id == 1) {
      userModel.userInfo(res => {
        if (res.is_send) {
          wx.showToast({
            title: '已申请或不是新用户',
            icon: 'none',
            duration: 1500,
            mask: false,
            success: result => {
              return false
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/applyFirst/index'
          })
        }
      })
    } else {
      wx.redirectTo({
        url: '/pages/applyscond/index?id=' + this.data.id
      })
    }
  }
})
