// pages/searchDetail/index.js
import { Http } from '../../utils/http'
import { config } from '../../config.js'
const http = new Http()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tags: [], //储存用户选择的标签
    index: 0,
    array: [], //储存后台获取的所有的标签
    tagsId: [], //储存用户选择的id
    titleVal: '', //储存问题标题
    describeVal: '', //储存问题描述
    imgArray: [], //储存图片地址
    imageArrayBd: [] //本地图片显示
  },
  onLoad(e) {
    //获取所有标签
    http.request({
      url: 'tag',
      success: res => {
        this.setData({
          array: res
        })
      }
    })
  },
  test(e) {
    console.log(e.detail.value)
  },
  //问题标题失去焦点
  titleBlur(e) {
    let thisVal = e.detail.value
    this.setData({
      titleVal: thisVal
    })
  },
  //问题描述失去焦点
  describeBlur(e) {
    let thisVal = e.detail.value
    let strs = []
    strs = thisVal.split('\n')
    for (let i = 0; i < strs.length; i++) {
      thisVal += strs[i] + '<br/>'
    }
    // console.log(thisVal)
    this.setData({
      describeVal: thisVal
    })
  },
  //添加图片
  getImage(e) {
    let { imgArray } = this.data
    wx.chooseImage({
      count: 1,
      success: res => {
        // console.log()
        wx.showLoading({
          title: '上传图片中...',
          mask: true
        })
        let imgArr = res.tempFilePaths
        //本地图片显示
        let imageArrayBd = this.data.imageArrayBd
        imageArrayBd.push(imgArr[0])
        this.setData({
          imageArrayBd
        })
        wx.uploadFile({
          url: config.baseUrl + 'article/uploadimg',
          filePath: imgArr[0],
          name: 'image',
          formData: {
            type: 1
          },
          header: {
            'content-type': 'application/json',
            cookie: wx.getStorageSync('sessionId'),
            'app-key': config.appKey
          },
          success: res => {
            if (res) {
              wx.hideLoading()
              imgArray.push(this.safe_replace(res.data))

              this.setData({
                imgArray
              })
              // console.log(imgArray)
            }
          }
        })
      }
    })
  },

  //删除图片
  deteleImage(e) {
    let index = e.currentTarget.dataset.index
    let { imgArray, imageArrayBd } = this.data
    // console.log(imgArray)
    imgArray.splice(index, 1)
    imageArrayBd.splice(index, 1)

    this.setData({
      imgArray,
      imageArrayBd
    })
    // console.log(imgArray)
  },

  //Picker选择
  bindPickerChange(e) {
    let { tags, array, tagsId } = this.data
    let index = e.detail.value
    let selectTag = array[index].name
    let selectId = array[index].id
    if (tagsId.includes(selectId)) {
      wx.showToast({
        title: '不能重复选择标签',
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      let tagsIdLength = tagsId.length
      if (tagsIdLength > 2) {
        wx.showToast({
          title: '最多选择三个标签',
          icon: 'none',
          duration: 2000
        })
        return false
      } else {
        tagsId.push(selectId)
        tags.push(selectTag)
        this.setData({
          tags,
          index,
          tagsId
        })
      }
    }
  },

  //删除标签
  closeTags(e) {
    let deleteIndex = e.target.dataset.index //获取当前删除的下标
    let { tagsId, tags } = this.data
    tagsId.splice(deleteIndex, 1)
    tags.splice(deleteIndex, 1)
    this.setData({
      tagsId,
      tags
    })
  },

  //提交问题
  sumbieQuiz(e) {
    let { tagsId, titleVal, describeVal, imgArray } = this.data

    //将图片地址追加到描述后面
    if (imgArray.length > 0) {
      let str = ''
      for (let i = 0; i < imgArray.length; i++) {
        str += `<p><img style="width:100%" src="${imgArray[i]}"/></p>`
      }
      describeVal += str
      this.setData({
        describeVal
      })
    }

    // tagsId.join(",");
    // console.log(tagsId)
    if (titleVal == '') {
      wx.showToast({
        title: '请填写问题标题',
        icon: 'none',
        duration: 2000
      })
    } else if (tagsId.length == 0) {
      wx.showToast({
        title: '请选择问题的标签',
        icon: 'none',
        duration: 2000
      })
    } else {
      http.checkLogin()
      http.request({
        url: 'article/add',
        method: 'POST',
        data: {
          type: 0,
          title: titleVal,
          content: describeVal,
          tag: tagsId.join(',')
        },
        success: res => {
          wx.showLoading({
            title: '提交中',
            mask: true
          })
          if (res) {
            console.log(res)
            wx.navigateTo({
              url: `../detail/index?type=0&&id=${res.id}`
            })
            wx.hideLoading()
          }
        }
      })
    }
  },
  safe_replace: function(str) {
    var str = str.replace('%20', '', str)
    str = str.replace('%27', '', str)
    str = str.replace('%2527', '', str)
    str = str.replace('*', '', str)
    str = str.replace('"', '&quot;', str)
    str = str.replace("'", '', str)
    str = str.replace('"', '', str)
    str = str.replace(';', '', str)
    str = str.replace('<', '&lt;', str)
    str = str.replace('>', '&gt;', str)
    str = str.replace('{', '', str)
    str = str.replace('}', '', str)
    str = str.replace('\\', '', str) //&quot
    str = str.replace('&quot', '', str) //
    return str
  }
})
