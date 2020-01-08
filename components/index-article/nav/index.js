// components/index-article/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataCurr:Number,
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
    //点击导航
    handleClick(e){
      let index = e.target.dataset.curr;
      let currIndex = this.data.dataCurr;
      if(index == currIndex){
        return false;
      }else{
        this.setData({
          dataCurr:index
        })
      this.triggerEvent("sendIndex",index)
        
      }
    }
  }
})
