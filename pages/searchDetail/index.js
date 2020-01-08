// pages/searchDetail/index.js
import { newsModel } from '../../models/newsModel.js';
let newsModels = new newsModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchStatus: false,
    dataItems: [],
    searchName: '请搜索',
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    if (e.val) {
      this.search({ detail: e.val, type: e.type || 1 });
    }
  },
  search(e) {
    let val = e.detail,
      type = e.type;
    let param = {
      keyword: val, page: 1, pagesize: 10, type: type
    }
    newsModels.search(param, res => {
      this.setData({
        dataItems: res,
        searchName: val,
        searchStatus: false,
        type: type
      })
    })
  },
  //显示搜索组件
  showSearch(e) {
    this.setData({
      searchStatus: true
    })
  },
  //隐藏搜索组件
  onGetStatus(e) {
    this.setData({
      searchStatus: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    let { page, searchName, dataItems, type } = this.data;
    let param = {
      keyword: searchName, page: page, pagesize: 10, type: type || 1
    }
    newsModels.search(res => {
      wx.showLoading({
        title: "加载中",
        mask: true
      });

      if (res.length == 0) {
        wx.hideLoading();
        wx.showToast({
          title: "没有更多内容了",
          icon: "none",
          duration: 2000
        })
      } else {
        dataItems.push(...res);
        // console.log(dataItems)
        this.setData({
          dataItems,
          searchName,
          searchStatus: false,
          page: page + 1
        })
        wx.hideLoading();
      }

    }, searchName, page, 10)


  },



})