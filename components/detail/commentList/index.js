// components/detail/commentList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentList: Array,
    commentNumber: Number,
    replyId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCommentList(e) {
      this.triggerEvent("getCommentList");
    },
    closeComment(e) {
      console.log(e)
      this.triggerEvent('closeComment', e.target.dataset);
    },
    onLike(e) {
      this.triggerEvent('onLike', e.detail);
    },
    onDiscuss(e) {
      this.triggerEvent('onDiscuss', e.detail);
    },
    deleteComment(e) {
      this.triggerEvent('deleteComment', e.detail);
    }
  }
})
