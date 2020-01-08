// components/userComponents/followPeople/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFollow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击关注
    handleFollow(e){
      let  index = e.currentTarget.dataset.index;
      const isFollow = this.data.isFollow
      let arr = this.data.items
      for(let i in arr){
        if(i == index){
        if(arr[i].status == 0){
          arr[i].status=1
        }else{
          arr[i].status=0
        }
        }
      }
      this.setData({
        items:arr
      })
      this.triggerEvent('unFocus',e.currentTarget.dataset.id)
    }
  }
})
