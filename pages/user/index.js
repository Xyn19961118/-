// pages/user/index.js
import { UserModel } from '../../models/userModel'
const user = new UserModel()
const app = getApp()
let interVal = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    userArtInfo: null,
    timer: 0,
    timeLeft: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    user.checkToken(res => {
      if (res.error == 0) {
        wx.navigateTo({
          url: '/pages/login/index'
        })
      } else {
        user.userInfo(res => {
          this.setData({
            info: res
          })
        })
      }
    })
    user.getUserNum(res => {
      this.setData({
        userArtInfo: res
      })
    })
  },

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
    clearInterval(interVal)
    user.userInfo(res => {
      this.setData({
        info: res
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  //倒计时
  setTime(endTime) {
    interVal = setInterval(() => {
      // console.log(endTime)
      let thisTime = new Date().getTime() / 1000
      let overTime = parseInt(endTime) - thisTime
      let day = Math.floor(overTime / (60 * 60 * 24))
      let hour = Math.floor((overTime - day * 24 * 60 * 60) / 3600)
      let minute = Math.floor(
        (overTime - day * 24 * 60 * 60 - hour * 3600) / 60
      )
      let second = Math.floor(
        overTime - day * 24 * 60 * 60 - hour * 3600 - minute * 60
      )
      // console.log(hour, minute, second)
      hour = this.iTwo(hour)
      minute = this.iTwo(minute)
      second = this.iTwo(second)
      if (day > 0) {
        var timeLeft = `${day}天${hour}:${minute}:${second}`
      } else {
        var timeLeft = '0天'
      }
      this.setData({
        timeLeft
      })
    }, 1000)
  },
  //+0操作
  iTwo(num) {
    return num < 10 ? '0' + num : num
  }
})
