// pages/userItems/selectTag/index.js
import { Http } from '../../../utils/http';

const http = new Http();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags:[],
    arr:[], //用来储存客户选择的标签id
    selected:false   //判断客户是否已经选择了标签
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    
    http.request({
      url:"tag",
      success:res=>{
        console.log(res)
        _this.setData({
          tags:res
        })
      },
      fail:res=>{
        wx.showToast({
          title:"加载失败，请重试",
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //选择标签
  selectTag(e){
    const index = e.currentTarget.dataset.index;
    const tags = this.data.tags;  
    const arr = this.data.arr;
    
    for(let i in tags){
      if(i ==index ){
        if(tags[i].active == 0){
          tags[i].active = 1;
          arr.push(tags[i].id);
        }else{
          tags[i].active = 0;
          arr.splice(arr.findIndex(item => item === tags[i].id), 1);
        }
      }
    }
    //判断标签是否选择超过一个
    if(arr.length>0){
      this.setData({
        selected:true
      })
    }else{
      this.setData({
        selected:false
      })
    }
    this.setData({
      tags,
      arr
    })
  },

  //提交标签
  submit(e){
    const that = this;
    const { arr, selected } = this.data;
    if(selected){
      //已经选择了标签
      http.request({
        url:"tag/addusertag",
        data:{
          id:arr.join(',')
        },
        success:res=>{
          // console.log(res)
          wx.switchTab({
            url: '../../user/index'
          })
        },
        fail:res=>{
          wx.showToast({
            title: '提交失败,请稍后再试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else{
      //未选择标签
      wx.showToast({
        title: '请至少选择一个标签',
        icon: 'none',
        duration: 2000
      })
    }
  },
})