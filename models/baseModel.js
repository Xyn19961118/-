import { Http } from '../utils/http'

class baseModel extends Http {
  //  检查状态码
  checkErrorCode(arr) {
    if (parseInt(arr.error) == 1001) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return false
    }
  }

  getTimeLeft(dateTimeTo) {
    // 计算目标与现在时间差（毫秒）
    let time1 = new Date(dateTimeTo).getTime()
    let time2 = new Date().getTime()
    let mss = time1 - time2
    // console.log(mss)
    if (mss > 0) {
      // 将时间差（毫秒）格式为：天时分秒
      let days = parseInt(mss / (1000 * 60 * 60 * 24))
      let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = parseInt((mss % (1000 * 60)) / 1000)
      return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
    } else {
      return 0 + '天'
    }
  }

  getAcc(param, res) {
    this.request({
      url: 'check/curlImg',
      data: {
        image: param
      },
      method: 'post',
      header: { 'Content-Type': 'application/octet-stream' },
      success: res
    })
  }

  checkContent(param, res) {
    this.request({
      url: 'check/curlMsg',
      data: {
        content: param
      },
      method: 'post',
      header: { 'Content-Type': 'application/json' },
      success: res
    })
  }

  showMsg(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false
    })
  }
}

export { baseModel }
