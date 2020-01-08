
import { topicModel } from '../../models/topicModel.js'
import { UserModel } from '../../models/userModel.js'
import { detailModel } from '../../models/detailModel.js'
let TopicsModel = new topicModel()
let UserModels = new UserModel()
let DetailModel = new detailModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    answerList: [], //回答列表
    //展开问题描述
    contentIsShow: false,
    focus: false,
    type: false,
    isBlock: false,
    detailType: 1,
    isComment: false,
    commentUser: '',
    topicId: 0,
    isReply: false,
    allComment: [],
    total: 0,
    replyId: 0,
    commentPage: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    TopicsModel.readTopic(e.id, res => {
      this.setData({
        content: res
      })
    })
  },
  //  删除话题
  deleteTopic(e) {
    wx.showModal({
      title: '温馨提示',
      content: '确认删除？',
      success: (result) => {
        if (result.confirm) {
          TopicsModel.deleteTopic(e.detail)
        }
      }
    });

  },
  deleteComment(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: (result) => {
        if (result.confirm) {
          TopicsModel.delComment(e.detail)
        }
      }
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // console.log(e)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    // console.log(e)
  },

  //展开问题描述
  handleOpen(e) {
    this.setData({
      contentIsShow: false
    })
  },
  comment(e) { },
  focusTopic(e) {
    let id = e.currentTarget.dataset.id
    let focus = this.data.focus
    detailM.getFocusTopic(id, res => {
      detailM.checkErrorCode(res)
      this.setData({
        focus: !focus
      })
    })
  },
  focusAuthor(e) {
    UserModels.getUserFocusStatus(e.detail.id, res => {
      UserModels.checkErrorCode(res)
      wx.showToast({
        duration: 1500
      })
    })
  },
  // 点赞
  onLike(e) {
    let id = e.detail.id
    TopicsModel.likeTopic(id)
  },
  showBlock(e) {
    let name = e.detail.name
    let id = e.detail.id
    let index = e.detail.index
    this.setData({
      isComment: true,
      commentUser: {
        name: name,
        pid: 0,
        replyId: id,
        userid: 0,
        index: index
      }
    })
  },
  closeComment(e) {
    let isBlock = this.data.isBlock
    this.setData({
      isBlock: !isBlock
    })
    let id = e.detail.id
    let param = {
      id: id, page: 1, pagesize: 10
    }
    TopicsModel.commentList(param, res => {
      this.setData({
        allComment: res.data,
        replyId: e.detail.id,
        total: e.detail.count
      })
    })
  },
  // 评论点赞
  clickMe(e) {
    console.log(e.detail)
    let { id, index, pid } = e.detail
    TopicsModel.commentLike(id, pid, res => {
      TopicsModel.checkErrorCode(res)
    })
    // detailM.commentClick(e.detail.id, type, e.detail.pid, res => {
    //   detailM.checkErrorCode(res)
    // })
  },
  onDiscuss(e) {
    this.setData({
      isComment: true,
      commentUser: e.detail
    })
  },
  onClose() {
    this.setData({
      isComment: false
    })
  },
  onComment(e) {
    let answerList = this.data.answerList
    let id = e.detail.reply_id || this.data.replyId
    let pid = e.detail.pid
    let index = e.detail.index
    let do_user_id = e.detail.user_id
    let content = e.detail.content
    let userinfo = wx.getStorageSync('user_info')
    // console.log(userinfo);
    //评论提交到后台
    TopicsModel.commentTopic(
      {
        topic_id: id,
        pid: pid,
        do_user_id: do_user_id,
        content: content
      },
      res => {
        TopicsModel.checkErrorCode(res)
        if (!res.error) {
          // if (type == 1) {
          //   //文章
          //   let data = {
          //     content,
          //     click_number: 0,
          //     id: res.id,
          //     likeStatus: 0,
          //     users: userinfo
          //   }
          //   let artContent = this.data.content
          //   artContent.commentList.unshift(data)
          //   this.setData({
          //     content: artContent
          //   })
          // } else {
          //   //模拟评论
          //   let data = {
          //     content,
          //     click_number: 0,
          //     id: res.id,
          //     likeStatus: 0,
          //     users: userinfo
          //   }
          //   answerList[0].commentList.unshift(data)
          //   // console.log(answerList)
          //   this.setData({
          //     answerList
          //   })
          // }

          wx.showToast({
            title: '评论成功',
            duration: 1500
          })
          this.setData({
            isComment: false
          })
        } else {
          console.log(res)
        }
      }
    )
  },
  //
  getCommentList(e) {

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let id = this.data.replyId
    let commentPage = this.data.commentPage
    TopicsModel.commentList(
      { id: id, page: commentPage, pagesize: 10 },
      res => {
        if (res.data.length == 0) {
          wx.hideLoading()
          wx.showToast({
            title: '已经没有更多内容了',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.hideLoading()
          let allComment = this.data.allComment
          let commentPage = this.data.commentPage
          allComment.push(...res.data)
          commentPage++
          // console.log(allComment)
          this.setData({
            allComment,
            commentPage
          })
          // console.log(this.data.allComment)
        }
        // this.setData({
        //   allComment: res,
        // })
      },
      commentPage
    )
  }
})
