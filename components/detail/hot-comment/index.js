// components/detail/hot-comment/index.js
import {
  detailModel
} from "../../../models/detailModel";
let detailM = new detailModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentList: Array,
    commentNumber: Number,
    replyId: Number,
    userinfo: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeUrl: "./images/like.png",
    likedUrl: "./images/liked.png"
  },
  attached(e) {
    const userinfo = wx.getStorageSync('user_info');     //获取缓存中的用户信息   
    this.setData({
      userinfo
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //评论点赞
    clickMe(e) {
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let pid = e.currentTarget.dataset.pid
      let commentList = this.data.commentList;//获取当前的评论
      for (let i in commentList) {
        if (i == index) {
          if (commentList[i].likeStatus == false) {
            commentList[i].likeStatus = true;
            commentList[i].click_number = commentList[i].click_number + 1
          } else {
            commentList[i].likeStatus = false;
            commentList[i].click_number = commentList[i].click_number - 1
          }
        }
      }
      this.setData({
        commentList,
      })
      this.triggerEvent('clickMe', { id: id, index: index, pid: pid })
    },
    //查看所有评论
    lookMore(e) {
      this.triggerEvent('lookMore', e.target.dataset);
    },

    //删除评论
    deleteComment(e) {
      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;
      let commentList = this.data.commentList;

      for (let i = 0; i < commentList.length; i++) {
        if (id == commentList[i].id) {
          commentList.splice(index, 1);
          this.setData({
            commentList
          })
        }
      }
      this.triggerEvent('deleteComment', id)
      // console.log(e.currentTarget.dataset.index)
      // detailM.deleteComment(id, res => {
      //   wx.showToast({
      //     title: '删除成功',
      //     icon: 'none'
      //   });
      // })
    }

  }
})
