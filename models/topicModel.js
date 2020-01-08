import { baseModel } from "./baseModel";
class topicModel extends baseModel {
  /**
   * 话题排行榜
   */
  topTopic(page, res) {
    this.request({
      url: "topics/topicTop",
      data: { page: page },
      success: res
    });
  }

  /**
   * 话题列表
   */
  topicList(id, page, res) {
    this.request({
      url: "topics/index",
      data: { id: id, page: page },
      success: res
    });
  }
  /**
   * 热门话题
   */
  hotTopic(id, res) {
    this.request({
      url: "topics/hotTopic",
      data: { id: id },
      success: res
    });
  }

  /**
   * 获取话题详情
   */
  readTopic(id, res) {
    this.request({
      url: "topics/read",
      data: { id: id },
      success: res
    });
  }

  /**
   * 删除话题
   */
  deleteTopic(id) {
    this.request({
      url: "topics/delete",
      data: { id: id }
    });
  }

  /**
   * 点赞话题
   */
  likeTopic(id, res) {
    this.request({
      url: "topics/like",
      data: { id: id },
      success: res
    });
  }

  /**
   * 评论话题
   * param = [id,content,pid,do_user_id]
   */
  commentTopic(param, res) {
    this.request({
      url: "topics/comment",
      data: param,
      success: res
    });
  }

  /**
   * 删除评论
   */
  delComment(id) {
    this.request({
      url: "topics/delComment",
      data: { id: id }
    });
  }

  /**
   * 查看/加载评论
   * param = [id,page,pagesize]
   */
  commentList(param, res) {
    this.request({
      url: "topics/loadCommentList",
      data: param,
      success: res
    });
  }

  /**
   * 评论点赞
   */
  commentLike(id, pid, res) {
    this.request({
      url: "topics/commentLike",
      data: { id: id, pid: pid },
      success: res
    });
  }
}

export { topicModel };
