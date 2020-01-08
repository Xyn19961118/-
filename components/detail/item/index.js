// components/detail/item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: Array,
    commentNumber:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    nodes: "",
    liked: true,
    collected: true,
    likeImg: "./images/icon01.png",
    likedImg: "./images/icon01@active.png",
    collectImg: "./images/icon02.png",
    collectedImg: "./images/icon02@active.png"
  },
  attached(){
    // console.log(this.data.items)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    focusAuthor(e) {
      let arr = this.data.items
      let index = e.currentTarget.dataset.index;
      for (let i in arr) {
        if (i == index) {
          if (arr[i].focusAuthor == 0) {
            arr[i].focusAuthor = 1
          }
        }
      }
      this.setData({
        items: arr
      })
      let status = e.currentTarget.dataset.status
      let id = e.currentTarget.dataset.id
      this.triggerEvent('focusAuthor', { status: status, id: id });
    },
    onLike(e){
      let index = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.id
      let arr = this.data.items
      for (let i in arr) {
        if (i == index) {
          if (arr[i].statusList.like_status == 0){
            arr[i].statusList.like_status = 1
            arr[i].like_number = arr[i].like_number + 1
          }else{
            arr[i].statusList.like_status = 0
            if(arr[i].like_number != 0){
              arr[i].like_number = arr[i].like_number - 1
            }
          }
        }
      }
      this.setData({
        items: arr
      })
      this.triggerEvent('onLike', {id:id});
    },
    onCollect(e){
      let index = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.id
      let arr = this.data.items
      for (let i in arr) {
        if (i == index) {
          if (arr[i].statusList.collect_status == 0){
            arr[i].statusList.collect_status = 1
          }else{
            arr[i].statusList.collect_status = 0
          }
        }
      }
      this.setData({
        items: arr
      })
      this.triggerEvent('onCollect', {id:id});
    },
    showBlock(e){
      this.triggerEvent('showBlock',e.currentTarget.dataset);
    },
    clickMe(e){
      this.triggerEvent('clickMe',e.detail);
    },
    lookMore(e){
      this.triggerEvent('lookMore',e.detail);
    }
  }
})
