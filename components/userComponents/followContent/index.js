// components/userComponents/followContent/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataCurr:Number,
    followArticle:Array,
    prople:Array
  },
  attached() {
    //计算swiper的高度
      const _this=this;
      wx.getSystemInfo({
        success: function(res) {
          const winHeight = res.windowHeight;
          const numPixelRatio = res.pixelRatio;
          if(numPixelRatio == 2){
            const contentHeight = winHeight -84;
            _this.setData({
              swiperHeight:contentHeight
            })
          }else if(numPixelRatio == 3){
            const contentHeight = winHeight -90;
            _this.setData({
              swiperHeight:contentHeight
            })
          }else{
              const contentHeight = winHeight -96;
              _this.setData({
                swiperHeight:contentHeight
              })
          }
         
        }
      })
    },
  /**
   * 组件的初始数据
   */
  data: {
    swiperHeight: 400,
    // followArticle:[{
    //         id: "554",
    //         title: "如果你不小心被困在荒岛上，但有种植5种水果/蔬菜的权利，这时候的你会如何选择呢？",
    //         content: "没有调料，只有一口锅，岛上有淡水，岛四周是海水，需要考虑自身的营养问题。细节追加（2019-03-19...",
    //         time: "一年"
    //     }, {
    //         id: "5555",
    //         title: "香港价真栈有哪些值得一买的零食呢？",
    //         content: "",
    //         time: "2年前"
    //     }, {
    //         id: "558",
    //         title: "伟大香港价真栈有哪些值得一买的零食呢？",
    //         content: "",
    //         time: "5年前"
    //     }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSwiper(e){
     this.triggerEvent("sendIndex",e.detail.current)
    },
    unFocus(e){
      this.triggerEvent("unFocus",e.detail)
    }
  }
})
