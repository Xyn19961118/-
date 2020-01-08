// pages/userItems/myData/index.js
import { Http } from "../../../utils/http";
const http = new Http();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: "",
		//储存头像
		headImage: "https://tva3.sinaimg.cn/crop.0.0.1080.1080.180/00630lXKjw8etnbo9jxi9j30u00u0wg7.jpg",
		index: 0,
		tags: [],   //用户已选择的标签
		array: [], //储存后台获取的所有的标签
		tagsId: [], //储存用户选择的id
		//选择标签的index值
		index: 0
	},
	onLoad(e) {
		const userinfo = wx.getStorageSync('user_info');//获取缓存中的用户信息    
		this.setData({
			userInfo: userinfo,
			tags: userinfo.tags_name,
			tagsId: userinfo.like_tags
		})
		http.request({
			url: "tag",
			success: (res) => {
				// console.log(res)
				this.setData({
					array: res
				})
			}
		})
	},
	//Picker选择
	bindPickerChange(e) {
		let { tags, array, tagsId } = this.data;
		let index = e.detail.value;
		let selectTag = array[index].name;
		// console.log(selectTag)
		let selectId = array[index].id;
		let isRepeat = false;  //储存是否重复选择
		// console.log(selectId)
		tagsId.forEach(item => {
			if (item == selectId) {
				wx.showToast({
					title: "不能重复选择标签",
					icon: "none",
					duration: 2000
				});
				isRepeat = true;
			}
		});
		if (!isRepeat) {
			tagsId.push(selectId);
			let addNewTag = {};
			addNewTag.name = selectTag
			addNewTag.id = selectId;
			tags.push(addNewTag);
			this.setData({
				tags,
				index,
				tagsId
			})
		}
		

	},

	//删除标签
	closeTags(e) {
		let index = e.currentTarget.dataset.index;
		let { tags, tagsId } = this.data;
		tags.splice(index, 1);
		tagsId.splice(index, 1);
		this.setData({
			tags,
			tagsId
		})
	},

	//提交
	submit(e){
		let tagsId = this.data.tagsId;
		if(tagsId.length == 0){
			wx.showToast({
					title: "请至少选择一个标签",
					icon: "none",
					duration: 2000
				});
		}else{
			http.request({
				url:"tag/addusertag",
				data:{
					id:tagsId.join(",")
				},
				success:res=>{
					wx.setStorageSync("user_info",res);
					wx.switchTab({
						url:"/pages/user/index"
					})
				},
				fail:(res)=>{
					wx.showToast({
						title: "修改失败，请稍后再试",
						icon: "none",
						duration: 2000
					});
				}
			})
		}
		
	}


})