import { indexModel } from '../../models/indexModel.js'
const article = new indexModel()
Page({
  data: {
    dataCurr: 1, //储存导航组件传过来的index
    focus: [],
    hot: [],
    page: 2,
    pagesize: 10
  },
  onLoad(e) {
    this.setData({
      id: e.id
    })
    this.publicLoad(this.data.id, 1, this.data.pagesize)
    wx.setNavigationBarTitle({
      title: e.name
    })
  },
  onShow(e) {},
  //下拉刷新
  onPullDownRefresh(e) {
    this.publicLoad(this.data.id, 1, this.data.pagesize)
  },

  //获取导航点击的index
  onGetIndex(e) {
    this.setData({
      dataCurr: e.detail
    })
  },
  loadMoreArice(e) {
    let { id, page, pagesize } = this.data
    this.publicLoad(id, page, pagesize)
    this.setData({
      page: page + 1
    })
  },
  publicLoad(id, page, pagesize) {
    var { focus, hot } = this.data
    article.categoryArt(
      res => {
        if (res.new.data.length < 1 || res.hot.data.length < 1) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            image: '',
            duration: 1500
          })
        }
        focus.push(...res.new.data)
        hot.push(...res.hot.data)
        this.setData({
          focus: focus,
          hot: hot
        })
      },
      id,
      page,
      pagesize
    )
  }
})
