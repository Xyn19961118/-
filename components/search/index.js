// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_show:{
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    search_list:[]
  },

  /**
   * 组件的方法列表
   */
    attached() {
      this.openStorage()
    },
  
  methods: {
    //搜索事件
    onSearch(e){
      let searchValue = e.detail.value;
      var searchData = this.data.search_list || [];
      if(searchData.includes(searchValue) !== true){
          searchData.unshift(searchValue);
          this.setData({
            search_list:searchData
          })
          if(searchData.length > 10){
            //储存搜索历史到缓存
            searchData.pop();
          }
           wx.setStorageSync("search_list",searchData)
      }
      this.triggerEvent('search',e.detail.value)
    },
    
    //读取历史纪录
    openStorage(e){
      var stora_list = wx.getStorageSync('search_list');
      this.setData({
        search_list:stora_list
      })
    },

  //清空历史纪录
  clearAll(e){
    wx.removeStorageSync("search_list");
    this.setData({
      search_list:[]
    })
      
  },

  //单个删除历史纪录
  undel(e){
    let index = e.target.dataset.index;
    let arr =this.data.search_list;
    arr.splice(index,1);
    wx.setStorageSync("search_list",arr);
    this.setData({
      search_list:arr
    })
  },

  handleReturn(e){
    let is_show = this.data.is_show;
    this.triggerEvent('returnHandle',is_show)
  },
  search(e){
    let val = e.target.dataset.val
    this.triggerEvent('search',val)
  }
    
  }
})
