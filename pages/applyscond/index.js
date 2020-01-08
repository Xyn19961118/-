import { UserModel } from '../../models/userModel'
let UserModels = new UserModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '', //用户名称
    applyReason: '', //文章板块及标题
    time: '', //文章发表时间
    recipient: '', //收件人
    phone: '', //手机号
    address: '' //收货地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('user_info')
    if (userInfo) {
      this.setData({
        userName: userInfo.wxname,
        id: options.id
      })
    } else {
      wx.showToast({
        title: '获取用户信息错误',
        icon: 'none'
      })
    }
  },
  onShow() {},
  //文章板块及标题
  blurApplyReason(e) {
    this.setData({
      applyReason: e.detail.value
    })
  },
  //选择时间
  bindDateChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //填写收件人
  blurRecipient(e) {
    this.setData({
      recipient: e.detail.value
    })
  },
  //填写联系方式
  blurPhone(e) {
    let phone = e.detail.value
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号填写错误',
        icon: 'none'
      })
    } else {
      this.setData({
        phone
      })
    }
  },
  //收件地址
  blurAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //提交表单
  submitForm() {
    UserModels.checkToken(res => {
      if (res.error == 0) {
        wx.redirectTo({
          url: '/pages/login/index'
        })
        return false
      }
    })

    let {
      userName,
      applyReason,
      recipient,
      time,
      phone,
      address,
      id
    } = this.data

    if (userName == '') {
      wx.showToast({
        title: '会员名称为空',
        icon: 'none'
      })
      return false
    }

    // if (applyReason == '') {
    //   wx.showToast({
    //     title: '请填写文章版块及标题',
    //     icon: 'none'
    //   })
    //   return false
    // }

    // if (time == '') {
    //   wx.showToast({
    //     title: '请选择文章发表时间',
    //     icon: 'none'
    //   })
    //   return false
    // }

    if (recipient == '') {
      wx.showToast({
        title: '请填写收件人',
        icon: 'none'
      })
      return false
    }

    if (phone == '') {
      wx.showToast({
        title: '请填写您的手机号',
        icon: 'none'
      })
      return false
    }

    if (address == '') {
      wx.showToast({
        title: '请填写您的收件地址',
        icon: 'none'
      })
      return false
    }

    wx.showModal({
      title: '提示',
      content: '请确保您的资料填写无误',
      success(res) {
        if (res.confirm) {
          let param = {
            article_title: applyReason,
            contact: recipient,
            mobile: phone,
            address: address,
            article_time: time,
            activity_id: id
          }
          UserModels.againApply(param, res => {
            if (res.error != 0) {
              wx.showToast({
                title: res.errmsg,
                icon: 'none',
                duration: 1500
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '申请成功，等待审核',
                showCancel: false,
                success: result => {
                  if (result.confirm) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
  onShareAppMessage: function() {}
})
