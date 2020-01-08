//index.js
//获取应用实例
// const app = getApp()
import { indexModel } from '../../models/indexModel.js'
const article = new indexModel()
Page({
  data: {
    searchStatus: false, //搜索组件获取的值
    dataCurr: 2, //储存导航组件传过来的index
    focus: [],
    collect: [],
    hot: []
  },
  onLoad(e) {},
  onShow(e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    const that = this
    for (let i = 0; i < 3; i++) {
      article.getArticle(i, 1, res => {
        if (res) {
          wx.hideLoading()
          switch (i) {
            case 1:
              that.setData({
                collect: res
              })
              break
            case 2:
              that.setData({
                hot: res
              })
              break
            default:
              that.setData({
                focus: res
              })
              break
          }
        }
      })
    }
  },
  //下拉刷新
  onPullDownRefresh(e) {
    const that = this
    for (let i = 0; i < 3; i++) {
      article.getArticle(i, 1, res => {
        console.log(res)
        if (res) {
          wx.hideLoading()
          switch (i) {
            case 1:
              that.setData({
                collect: res
              })
              break
            case 2:
              that.setData({
                hot: res
              })
              break
            default:
              that.setData({
                focus: res
              })
              break
          }
        }
      })
    }
    // wx.startPullDownRefresh({
    // 	success:(res)=>{
    // 		const that = this;
    // 		for (let i = 0; i < 3; i++) {
    // 			article.getArticle(i, 1, res => {
    // 				console.log(res)
    // 				if (res) {
    // 					wx.stopPullDownRefresh();
    // 					switch (i) {
    // 						case 1:
    // 							that.setData({
    // 								collect: res
    // 							})
    // 							break;
    // 						case 2:
    // 							that.setData({
    // 								hot: res
    // 							})
    // 							break;
    // 						default:
    // 							that.setData({
    // 								focus: res
    // 							})
    // 							break;
    // 					}
    // 				}

    // 			});
    // 		}
    // 	}
    // })
  },

  //显示搜素框
  showSearch(e) {
    this.setData({
      searchStatus: true
    })
  },

  //获取搜索子组件传过来的false
  onGetStatus(e) {
    this.setData({
      searchStatus: e.detail
    })
  },

  //获取导航点击的index
  onGetIndex(e) {
    this.setData({
      dataCurr: e.detail
    })
  },
  //加载关注分页
  getPageArt(e) {
    let focus = this.data.focus
    focus.push(...e.detail)
    this.setData({
      focus
    })
  },
  //加载收藏分页
  newPageArt(e) {
    let collect = this.data.collect
    collect.push(...e.detail)
    this.setData({
      collect
    })
  },

  //去提问
  goToQuiz(e) {
    let userinfo = wx.getStorageSync('user_info') //获取缓存中的用户信息
    if (!userinfo) {
      wx.redirectTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../quiz/index'
      })
    }
  },
  search(e) {
    let val = e.detail
    wx.navigateTo({
      url: `/pages/searchDetail/index?val=${val}`
    })
  }
})
