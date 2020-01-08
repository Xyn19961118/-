import { baseModel } from './baseModel'
class detailModel extends baseModel {
  //获取话题详情
  getDetailArticle(type, id, sCallBack) {
    this.request({
      url: 'article/detail',
      data: {
        type,
        id
      },
      success: res => {
        sCallBack(res)
      }
    })
  }

  //获取话题回答列表
  getAnswerList(id, sCallBack) {
    this.request({
      url: 'reply',
      data: {
        id
      },
      success: res => {
        sCallBack(res)
      }
    })
  }

  // 关注问题 type 1文章、2回答、0话题
  getFocusTopic(id, success) {
    this.request({
      url: 'like/focus',
      data: {
        id: id
      },
      success: success
    })
  }

  getUserFocus(userId, success) {
    this.request({
      url: 'like/userfocus',
      data: {
        id: userId
      },
      success: success
    })
  }

  // 点赞回答 type 1文章、2回答、0话题
  likeReply(id, type = 2, success) {
    this.request({
      url: 'like',
      data: {
        id: id,
        type: type
      },
      success: success
    })
  }
  // 收藏回答 type 1文章、2回答、0话题
  collectReply(id, type = 2, success) {
    this.request({
      url: 'like/collect',
      data: {
        id: id,
        type: type
      },
      success: success
    })
  }
  //评论回答
  userComment(data, success) {
    this.request({
      url: 'comment',
      data: data,
      success: success
    })
  }
  // 评论点赞
  commentClick(id, type, pid, success) {
    this.request({
      url: 'comment/clickcomment',
      data: {
        id: id,
        type: type,
        pid: pid
      },
      success: success
    })
  }
  commentList(
    id,
    type,
    success,
    page = 1,
    pagesize = 10,
    sort = 'click_number'
  ) {
    this.request({
      url: 'comment/commentList',
      data: {
        id: id,
        type: type,
        page: page,
        pagesize: pagesize,
        sort: sort
      },
      success: success
    })
  }

  //删除评论
  deleteComment(id, callBack) {
    this.request({
      url: 'comment/delcomment',
      data: {
        id
      },
      success: callBack
    })
  }

  // 删除文章
  deleteArt(id, success) {
    this.request({
      url: 'article/delarticle',
      data: {
        type: 1,
        id: id
      },
      success: success
    })
  }
}

export { detailModel }
