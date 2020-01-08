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
    //  删除评论
    deleteComment(e) {
      detailModels.deleteComment(e.detail)
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
      // console.log(content)
      this.setData({
        content
      })
      // console.log(id)
      this.triggerEvent('onLike', {
        id: id
      })
    },
    //收藏
    onCollect(e) {
      let id = e.currentTarget.dataset.id
      let content = this.data.content
      if (content.statusList.collect_status == 0) {
        content.statusList.collect_status = 1
      } else {
        content.statusList.collect_status = 0
      }
      this.setData({
        content
      })
      this.triggerEvent('onCollect', {
        id: id
      })
    },
    showBlock(e) {
      this.triggerEvent('showBlock', e.currentTarget.dataset)
    },
    clickMe(e) {
      this.triggerEvent('clickMe', e.detail)
    },
    //删除文章
    deleteArticle(e) {
      let id = e.currentTarget.dataset.id
      wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        success(res) {
          if (res.confirm) {
            detailModels.deleteArt(id, res => {
              detailModels.checkErrorCode(res)
              if (res.error == 0) {
                wx.showToast({
                  title: '删除成功'
                })
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                }, 1000)
              }
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '取消删除',
              icon: 'none'
            })
          }
        }
      })
    }

  }
})
