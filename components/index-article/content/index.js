import { indexModel } from '../../../models/indexModel'
const indexM = new indexModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataCurr: Number, //接收父组件传递的index
    followArticle: Array,
    newArticle: Array,
    hotArticle: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperHeight: 500,
    followPage: 2,
    newPage: 2
  },

  attached() {
    //计算swiper的高度
    // const _this = this
    // wx.getSystemInfo({
    //   success: function(res) {
    //     //  const winHeight;
    //     const winHeight = res.windowHeight
    //     const numPixelRatio = res.pixelRatio
    //     if (numPixelRatio == 2) {
    //       const contentHeight = winHeight - 101
    //       _this.setData({
    //         swiperHeight: contentHeight
    //       })
    //     } else if (numPixelRatio == 3) {
    //       const contentHeight = winHeight - 109
    //       _this.setData({
    //         swiperHeight: contentHeight
    //       })
    //     } else {
    //       const contentHeight = winHeight - 106
    //       _this.setData({
    //         swiperHeight: contentHeight
    //       })
    //     }
    //   }
    // })
  },
  onShow() {},
  /**
   * 组件的方法列表
   */
  methods: {
    //swiper滑动事件
    handleSwiper(e) {
      this.triggerEvent('sendIndex', e.detail.current)
    },
    //上拉加载
    loadMoreArice_1(e) {
      const thisIndex = this.data.dataCurr //获取当前的Index 0是“关注” 1是“最新”
      if (thisIndex == 0) {
        //请求关注接口
        let followPage = this.data.followPage
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        indexM.getArticle(thisIndex, followPage, res => {
          if (res) {
            if (res.length == 0) {
              wx.hideLoading()
              wx.showToast({
                title: '没有更多数据',
                icon: 'none',
                duration: 2000
              })
            } else {
              this.triggerEvent('getPageArt', res)
              wx.hideLoading()
              this.setData({
                followPage: followPage + 1
              })
            }
          }
        })
      } else if (thisIndex == 1) {
        //请求最新接口
        let newPage = this.data.newPage
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        indexM.getArticle(thisIndex, newPage, res => {
          if (res) {
            if (res.length == 0) {
              wx.showToast({
                title: '没有更多数据',
                icon: 'none',
                duration: 2000
              })
            } else {
              this.triggerEvent('newPageArt', res)
              wx.hideLoading()
              this.setData({
                newPage: newPage + 1
              })
            }
          }
        })
      }
    },
    loadMoreArice(e) {
      this.triggerEvent('loadMoreArice')
    }
  }
})
