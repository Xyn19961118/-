import { baseModel } from './baseModel'
class newsModel extends baseModel {
  getCommentList(success, page = 1, pagesize = 20) {
    this.request({
      url: 'user/getCommentList',
      data: {
        page: page,
        pagesize: pagesize
      },
      success: success
    })
  }

  search(param, res) {
    this.request({
      url: 'index/search',
      data: param,
      success: res
    })
  }
}

export { newsModel }
