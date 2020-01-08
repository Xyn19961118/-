import { baseModel } from './baseModel'
class UserModel extends baseModel {
  //获取用户信息
  getUser(sCallBack) {
    this.request({
      url: 'login',
      success: res => {
        sCallBack()
      }
    })
  }
  /**
   *  获取用户的文章、话题、回答及关注与收藏
   * @param string type
   * @param callback success
   */
  getUserTypeInfo(type, page, success) {
    this.request({
      url: 'user/usernews',
      data: {
        type: type, page: page
      },
      success: success
    })
  }
  /**
   *  更改用户关注用户的状态
   * @param string id
   * @param  success
   */
  getUserFocusStatus(id, success) {
    this.request({
      url: 'like/userfocus',
      data: {
        id: id
      },
      success: success
    })
  }

  getFocusMeUser(page, success) {
    this.request({
      url: 'user/getFocusMeUsers',
      data: { page: page },
      success: success
    })
  }

  getUsersInfo(id, success, page, pagesize) {
    this.request({
      url: 'user/getUsersInfo',
      data: {
        id: id,
        page: page,
        pagesize: pagesize
      },
      success: success
    })
  }

  getUserNum(callBack) {
    this.request({
      url: 'user',
      success: callBack
    })
  }
  /**
   * 验证TOKEN  是否有效
   */
  checkToken(res) {
    this.request({
      url: 'login/checkToken',
      success: res
    })
  }

  /**
   * 个人信息
   */
  userInfo(res) {
    this.request({
      url: 'user/userInfo',
      success: res
    })
  }
  /**
   * 第一次申请
   */
  firstApply(param, res) {
    this.request({
      url: 'activity/firstApply',
      data: param,
      method: 'POST',
      success: res
    })
  }

  /**
   * 再次申请
   */
  againApply(param, res) {
    this.request({
      url: 'activity/againApply',
      data: param,
      method: 'POST',
      success: res
    })
  }

  /**
   * 获取用户话题
   */
  getTopics(page, res) {
    this.request({
      url: 'user/getTopics',
      data: { page: page },
      success: res
    })
  }
}

export { UserModel }
