// pages/writeReply/index.js
import { Http } from '../../utils/http'
import { config } from '../../config.js'
const http = new Http()
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '请输入内容',
    _focus: false,
    editorContent: '', //储存富文本内容
    replyId: 0
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad(e) {
    this.setData({
      replyId: e.id
    })
  },
  onShow() {
    http.checkLogin()
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery()
      .select('#editor')
      .context(function(res) {
        that.editorCtx = res.context
      })
      .exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {}
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {}
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        wx.showLoading({
          title: '上传图片中...',
          mask: true
        })

        let imgArr = res.tempFilePaths
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
            wx.hideLoading()
            that.editorCtx.insertImage({
              src: that.safe_replace(res.data)
            })
          }
        })
      }
    })
  },

  getEditor(e) {
    let editorContent = e.detail.html
    this.setData({
      editorContent
    })
  },
  //提交表单
  submitArticle(e) {
    let { editorContent, replyId } = this.data
    if (editorContent == '') {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '提交中...',
        mask: true
      })
      http.checkLogin()
      http.request({
        url: 'reply/add',
        method: 'POST',
        data: {
          id: replyId,
          desc: editorContent
        },
        success: res => {
          if (res) {
            wx.hideLoading()
            wx.navigateTo({
              url: `../detail/index?type=0&&id=${replyId}`
            })
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
