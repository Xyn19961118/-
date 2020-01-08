// components/detail/commentItem/index.js
import {
  detailModel
} from "../../../models/detailModel";
let detailM = new detailModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: Array,
    userinfo: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    userinfo: null
  },

  attached() {
    const userinfo = wx.getStorageSync('user_info'); //获取缓存中的用户信息   
    // console.log(userinfo)
    this.setData({
      userinfo
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      this.triggerEvent('onLike', e.detail)
    },
    onClick(e) {
      let index = e.currentTarget.dataset.index
      let comment = this.data.comment; //获取当前的评论
      for (let i in comment) {
        if (i == index) {
          if (comment[i].likeStatus == false) {
            comment[i].likeStatus = true;
            comment[i].click_number = comment[i].click_number + 1
          } else {
            comment[i].likeStatus = false;
            comment[i].click_number = comment[i].click_number - 1
          }
        }
      }
      this.setData({
        comment,
      })
      this.triggerEvent('onLike', e.currentTarget.dataset)
    },
    discuss(e) {
      this.triggerEvent('discuss', e.currentTarget.dataset)
    },
    onDiscuss(e) {
      this.triggerEvent('discuss', e.detail)
    },
    //删除评论
    deleteComment(e) {
      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;
      let comment = this.data.comment;
      for (let i = 0; i < comment.length; i++) {
        if (id == comment[i].id) {
          comment.splice(index, 1);
          this.setData({
            comment
          })
        };
      }
      this.triggerEvent('deleteComment', id)
    },
    sonDeleteComment(e) {
      this.triggerEvent('sonDeleteComment', e.detail)
    }
  }

})