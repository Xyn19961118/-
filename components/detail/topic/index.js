// components/detail/article/index.js
import { Http } from '../../../utils/http'
import { detailModel } from '../../../models/detailModel'
const http = new Http()
const detailModels = new detailModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: Object,
    replyId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    userinfo: null
  },
  attached(e) {
    const userinfo = wx.getStorageSync('user_info') //获取缓存中的用户信息
    this.setData({
      userinfo
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //关注
    followMe(e) {
      let content = this.data.content
      let userId = content.users.id
      if (content.focusAuthor) {
        content.focusAuthor = false
      } else {
        content.focusAuthor = true
      }
      this.setData({
        content
      })
      detailModels.getUserFocus(userId, res => {
        detailModels.checkErrorCode(res)
      })
    },
    //查看所有评论
    lookMore(e) {
      this.triggerEvent('lookMore', e.detail)
    },
    //点赞
    onLike(e) {
      let index = e.currentTarget.dataset.index
      let id = e.currentTarget.dataset.id
      let content = this.data.content
      if (content.statusList.like_status == 0) {
        content.statusList.like_status = 1
        content.like_number = content.like_number + 1
      } else {
        content.statusList.like_status = 0
        if (content.like_number != 0) {
          content.like_number = content.like_number - 1
        }
      }
      this.setData({
        content
      })
      this.triggerEvent('onLike', {
        id: id
      })
    },
    showBlock(e) {
      this.triggerEvent('showBlock', e.currentTarget.dataset)
    },
    clickMe(e) {
      this.triggerEvent('clickMe', e.detail)
    },
    //删除话题
    deleteTopic(e) {
      let id = e.currentTarget.dataset.id
      this.triggerEvent('deleteTopic', id)
    },
    deleteComment(e) {
      this.triggerEvent('deleteComment', e.detail)
    }
  }
})
