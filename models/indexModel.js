import { baseModel } from "./baseModel";
class indexModel extends baseModel {
  //获取文章
  getArticle(dataCurr, page, sCallBack) {
    let order = 0;
    switch (dataCurr) {
      case 0:
        order = 1;
        break;
      case 1:
        order = 0;
        break;
      case 2:
        order = 10;
        break;
    }
    this.request({
      url: "article/index",
      data: {
        type: 0,
        page,
        pagesize: 50,
        order
      },
      success: res => {
        sCallBack(res);
      }
    });
  }

  /**
   * 文章添加
   */
  articleAdd(param, res) {
    this.request({
      url: "article/add",
      method: "POST",
      data: param,
      success: res
    });
  }

  /**
   * 获取分类
   */
  category(res) {
    this.request({
      url: "index/category",
      success: res
    });
  }

  /**
   * 分类文章
   */
  categoryArt(res, id, page, pagesize) {
    this.request({
      url: "article/categoryArt",
      data: { id: id, page: page, pagesize: pagesize },
      success: res
    });
  }

  /**
   * 活动详情
   */
  activityRead(id, res) {
    this.request({
      url: "activity/read",
      data: {
        id: id
      },
      success: res
    });
  }

  /**
   * 获取问卷星ID
   */
  soJump(res) {
    this.request({
      url: "index/soJump",
      success: res
    });
  }

  /**
   * 获取话题
   */
  getTopics(res) {
    this.request({
      url: "index/topicCategory",
      success: res
    });
  }

  /**
   * 查询话题
   */
  likeTopics(name, res) {
    this.request({
      url: "index/likeTopics",
      data: {
        name: name
      },
      success: res
    });
  }

  /**
   * 提交话题
   */
  submitTopic(param, res) {
    this.checkLogin();
    this.request({
      url: "topics/create",
      method: "POST",
      data: param,
      success: res
    });
  }
}

export { indexModel };
