import { Http } from "../../utils/http";
import { config } from "../../config.js";
import { indexModel } from "../../models/indexModel";
let IndexModels = new indexModel();
const http = new Http();
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: "请输入内容",
    _focus: false,
    hidden: true,
    isAuto: false,
    tags: [], //储存用户选择的标签
    index: 0,
    array: [], //储存后台获取的所有的标签
    tagsId: [], //储存用户选择的id
    inputVal: "", //储存关键词
    snapVal: "",
    titleInput: "", //储存标题
    editorContent: "", //储存富文本内容
    isReady: false, //判断富文本是否实例化完成
    showPicker: true,
    display: true,
    topicsId: 0,
    items: [],
    itemsDisplay: false,
    newTopic: false,
    topicsValue: ""
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    });
  },
  onLoad(e) {
    IndexModels.checkLogin();
    this.setData({
      topicsValue: e.name || "",
      topicsId: e.id || 0,
      id: e.id || 0
    });
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    //获取所有标签
    IndexModels.getTopics(res => {
      this.setData({
        array: res
      });
      wx.hideLoading();
    });
  },
  resetTopicVal() {
    this.setData({
      topicsValue: "",
      topicsId: 0
    });
  },
  getTopics(e) {
    let val = e.detail.value;
    if (val != "") {
      IndexModels.likeTopics(val, res => {
        let newTopic = this.fuzzyQuery(res, val);
        if (newTopic == false) {
          res.unshift({ id: 0, name: val, new: true });
        }
        this.setData({
          items: res,
          itemsDisplay: true,
          newTopic: !newTopic
        });
      });
    } else {
      this.setData({
        itemsDisplay: false
      });
    }
  },
  fuzzyQuery(list, keyWord) {
    let status = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == keyWord) {
        status = true;
      }
    }
    return status;
  },
  tapHidden() {
    this.setData({
      display: false
    });
  },
  radioChange(e) {
    let id = e.detail.value,
      list = this.data.array,
      name = "";
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        name = list[i].name;
      }
    }
    IndexModels.checkContent(name, res => {
      if (res.errcode == 0) {
        this.setData({
          topicsValue: name
        });
      } else {
        IndexModels.showMsg(res.errmsg);
      }
    });
    this.setData({
      topicsId: id,
      display: true
    });
  },
  radioChangeItems(e) {
    let id = e.detail.value,
      list = this.data.items,
      name = "";
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        name = list[i].name;
      }
    }
    IndexModels.checkContent(name, res => {
      if (res.errcode == 0) {
        this.setData({
          topicsValue: name
        });
      } else {
        IndexModels.showMsg(res.errmsg);
      }
    });

    this.setData({
      topicsId: id,
      display: true
    });
  },
  onShow() {},
  onHide() {},

  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    let { name, value } = e.target.dataset;
    if (!name) return;
    this.editorCtx.format(name, value);
  },
  onStatusChange(e) {
    const formats = e.detail;
    this.setData({
      formats
    });
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {}
    });
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {}
    });
  },
  onEditorReady() {
    //每次都初始化一下编辑器
    const that = this;
    wx.createSelectorQuery()
      .select("#editor")
      .context(function(res) {
        that.editorCtx = res.context;
      })
      .exec();
    this.setData({
      isReady: true
    });
  },
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  insertDate() {
    const date = new Date();
    const formatDate = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()}`;
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  insertImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        wx.showLoading({
          title: "上传图片中...",
          mask: true
        });
        let imgArr = res.tempFilePaths[0];
        if (imgArr && imgArr.size > 1024 * 1024) {
          wx.showToast({
            title: "图片不能大于1M",
            icon: "none"
          });
          return false;
        }
        wx.uploadFile({
          url: config.baseUrl + "article/uploadimg",
          filePath: imgArr,
          name: "image",
          formData: {
            type: 0
          },
          header: {
            "content-type": "application/json",
            token: wx.getStorageSync("sessionId"),
            "app-key": config.appKey
          },
          success: result => {
            if (result) {
              wx.hideLoading();
              let imgUrl = result.data;
              IndexModels.getAcc(that.safe_replace(imgUrl), res => {
                if (res.errcode != 0) {
                  wx.showToast({
                    title: res.errmsg,
                    icon: "none",
                    duration: 1500
                  });
                } else {
                  that.editorCtx.insertImage({
                    src: that.safe_replace(imgUrl)
                  });
                }
              });
            }
            return false;
          }
        });
      }
    });
  },
  //Picker选择
  bindPickerChange(e) {
    let { tags, array, tagsId } = this.data;
    let index = e.detail.value;
    let selectTag = array[index].name;
    let selectId = array[index].id;
    if (tagsId.includes(selectId)) {
      wx.showToast({
        title: "不能重复选择标签",
        icon: "none",
        duration: 2000
      });
      return false;
    } else {
      let tagsIdLength = tagsId.length;
      if (tagsIdLength == 1) {
        wx.showToast({
          title: "最多选择一个标签",
          icon: "none",
          duration: 2000
        });
        return false;
      } else {
        tagsId.push(selectId);
        tags.push(selectTag);
        this.setData({
          tags,
          index,
          tagsId,
          showPicker: false
        });
      }
    }
  },
  //添加标题
  getTitle(e) {
    let titleInput = e.detail.value;
    this.setData({
      titleInput
    });
  },
  //删除标签
  closeTags(e) {
    let deleteIndex = e.target.dataset.index; //获取当前删除的下标
    let { tagsId, tags } = this.data;
    tagsId.splice(deleteIndex, 1);
    tags.splice(deleteIndex, 1);
    this.setData({
      tagsId,
      tags,
      showPicker: true
    });
  },
  //添加关键词
  addKeywords(e) {
    this.setData({
      hidden: false,
      isAuto: true
    });
  },
  //关键词输入
  kerwordInput(e) {
    let inputVal = e.detail.value;
    let inputValLength = e.detail.cursor; //获取输入的字数
    if (inputValLength > 50) {
      wx.showToast({
        title: "最多输入50个字",
        icon: "none",
        duration: 2000
      });
      inputVal = inputVal.substring(0, 50);
    }

    this.setData({
      snapVal: inputVal
    });
  },
  //添加关键词取消
  cancel(e) {
    this.setData({
      hidden: true,
      isAuto: false
    });
  },
  //添加关键词确定
  confirm(e) {
    let snapVal = this.data.snapVal;
    this.setData({
      hidden: true,
      isAuto: false,
      inputVal: snapVal
    });
  },
  getEditor(e) {
    let editorContent = e.detail.html;
    this.setData({
      editorContent
    });
  },
  //提交表单
  submitArticle(e) {
    let { editorContent, topicsId, topicsValue } = this.data;
    if (editorContent == "") {
      wx.showToast({
        title: "请填写文章内容",
        icon: "none",
        duration: 2000
      });
    } else if (topicsValue == "") {
      wx.showToast({
        title: "请填写话题",
        icon: "none",
        duration: 2000
      });
    } else {
      wx.showLoading({
        title: "发布中...",
        mask: true
      });
      var that = this;
      let param = {
        content: editorContent,
        cat_id: topicsId,
        val: topicsValue
      };
      IndexModels.checkContent(editorContent, res => {
        if (res.errcode != 0) {
          IndexModels.showMsg(res.errmsg);
        } else {
          IndexModels.checkContent(topicsValue, res => {
            if (res.errcode == 0) {
              IndexModels.submitTopic(param, res => {
                wx.showModal({
                  title: "提示",
                  content: "发布成功，请等待审核",
                  showCancel: false,
                  success: result => {
                    if (result.confirm) {
                      wx.navigateBack({
                        delta: 1
                      });
                    }
                  }
                });
              });
            } else {
              IndexModels.showMsg(res.errMsg);
            }
          });
        }
      });
      wx.hideLoading();
    }
  },
  safe_replace: function(str) {
    var str = str.replace("%20", "", str);
    str = str.replace("%27", "", str);
    str = str.replace("%2527", "", str);
    str = str.replace("*", "", str);
    str = str.replace('"', "&quot;", str);
    str = str.replace("'", "", str);
    str = str.replace('"', "", str);
    str = str.replace(";", "", str);
    str = str.replace("<", "&lt;", str);
    str = str.replace(">", "&gt;", str);
    str = str.replace("{", "", str);
    str = str.replace("}", "", str);
    str = str.replace("\\", "", str); //&quot
    str = str.replace("&quot", "", str); //
    return str;
  },
  clearAll() {
    this.setData({
      tags: [],
      inputVal: "",
      titleInput: "",
      tagsId: []
    });
    if (this.data.isReady) {
      this.clear();
    }
  },
  cloud() {}
});
