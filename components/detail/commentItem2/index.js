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
    childComment: Array,
    userinfo: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached() { },
  /**
   * 组件的方法列表
   */
  methods: {
    onLikes(e) {
      let index = e.currentTarget.dataset.index
      let childComment = this.data.childComment; //获取当前的评论
      for (let i in childComment) {
        if (i == index) {
          if (childComment[i].likeStatus == false) {
            childComment[i].likeStatus = true;
            childComment[i].click_number = childComment[i].click_number + 1
          } else {
            childComment[i].likeStatus = false;
            childComment[i].click_number = childComment[i].click_number - 1
          }
        }
      }

      this.setData({
        childComment: childComment
      })
      this.triggerEvent('onLike', e.currentTarget.dataset);
    },
    discuss(e) {
      // console.log(e.currentTarget.dataset)
      this.triggerEvent('discuss', e.currentTarget.dataset);
    },
    deleteComment(e) {
      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;
      let childComment = this.data.childComment;
      for (let i = 0; i < childComment.length; i++) {
        if (id == childComment[i].id) {
          childComment.splice(index, 1);
          this.setData({
            childComment
          })
        };
      }
      this.triggerEvent('deleteComment', id)
    }
  }
})