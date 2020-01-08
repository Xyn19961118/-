// components/discussForm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: Object,
    isClose: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    isInput: false,
    text: ''
  },

  attached() {
    console.log(this.data.info)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //关闭评论
    close(e) {
      // e.stopPropagation();
      this.triggerEvent('onClose')
    },
    //判断textarea是否输入文字
    isInput(e) {
      this.setData({
        text: e.detail.value
      })
      let valueLength = e.detail.cursor //输入的字数
      if (valueLength > 0) {
        if (valueLength > 200) {
          wx.showToast({
            title: '最多评论200个汉字',
            icon: 'none',
            duration: 1500
          })
        }
        this.setData({
          isInput: true
        })
      } else {
        this.setData({
          isInput: false
        })
      }
    },
    //评论提交
    discussSubmit(e) {
      let isInput = this.data.isInput
      let text = this.data.text
      let pid = e.currentTarget.dataset.pid
      let userId = e.currentTarget.dataset.userid
      let replyId = e.currentTarget.dataset.replyid
      let arr = {
        pid: pid,
        user_id: userId,
        reply_id: replyId,
        content: text
      }
      if (isInput) {
        // console.log("aa")
        this.triggerEvent('onComment', arr)
      } else {
        wx.showToast({
          title: '请填写评论内容',
          icon: 'none',
          duration: 1500
        })
      }
    }
  }
})
