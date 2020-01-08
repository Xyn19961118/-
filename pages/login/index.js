// pages/login/index.js
import { config } from '../../config.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAgree: false,
    protocolIsShow: false,
    content:
      '<p style="width:94%;margin:auto"><strong>一、帐号注册与使用</strong><br/></p><p style="width:94%;margin:auto">您使用AI你知道吗产品或服务时需要注册帐号或授权登陆，当您注册和使用帐号时应遵守下述要求：</p><p style="width:94%;margin:auto">1.用户注册成功后，每个用户拥有一个用户帐号，用户应当对以其帐号进行的所有活动和事件负法律责任。</p><p style="width:94%;margin:auto">2.用户不应将其帐号、密码转让、出售或出借予他人使用，帐号使用权仅属于初始申请注册人，用户应对帐号内的全部行为独立承担全部责任。</p><p style="width:94%;margin:auto">3.在需要终止使用帐号服务时，您仍应对您在注销帐号前且使用东莞祥顺公司服务期间的行为承担相应责任，同时东莞祥顺公司仍可保存您注销前的相关信息；</p><p style="width:94%;margin:auto">4.隐私权保护声明</p><p style="width:94%;margin:auto">（1）帮助您成为我们的注册用户</p><p style="width:94%;margin:auto">您注册帐号时须至少向我们提供或授权帐号名称等信息。</p><p style="width:94%;margin:auto">（2）您向我们提供的信息</p><p style="width:94%;margin:auto">您使用我们的和服务时（如发表文章等），为满足向您提供产品和服务之目的，除注册时提供的信息外，您可能还需要进一步向我们提供与上述产品和服务的功能相关的信息（例如您的真实姓名、性别、出生日期、常用地址、头像和简介等）。如果您不使用特定产品和服务，则无需提供相关信息。</p><p style="width:94%;margin:auto">（3）为了给您提供服务，我们会根据法律法规规定提供您的个人信息给合作方。</p><p style="width:94%;margin:auto"><strong>三、使用规则</strong></p><p style="width:94%;margin:auto"><strong>1.用户在使用公司的服务时，必须遵守《网络安全法》等中华人民共和国相关法律法规的规定，用户应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为:</strong></p><p style="width:94%;margin:auto"><strong>（1）上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：</strong></p><p style="width:94%;margin:auto"><strong>　　1）反对宪法所确定的基本原则的；</strong></p><p style="width:94%;margin:auto"><strong>　　2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</strong></p><p style="width:94%;margin:auto"><strong>　　3）损害国家荣誉和利益的；</strong></p><p style="width:94%;margin:auto"><strong>　　4）煽动民族仇恨、民族歧视、破坏民族团结的；</strong></p><p style="width:94%;margin:auto"><strong>　　5）破坏国家宗教政策，宣扬邪教和封建迷信的；</strong></p><p style="width:94%;margin:auto"><strong>　　6）散布谣言，扰乱社会秩序，破坏社会稳定的；</strong></p><p style="width:94%;margin:auto"><strong>　　7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</strong></p><p style="width:94%;margin:auto"><strong>　　8）侮辱或者诽谤他人，侵害他人合法权利的；</strong></p><p style="width:94%;margin:auto"><strong>　　9）含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</strong></p><p style="width:94%;margin:auto"><strong>　　10）含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；</strong></p><p style="width:94%;margin:auto"><strong>（2）不得为任何非法目的而使用网络服务系统；</strong></p><p style="width:94%;margin:auto"><strong>（3）不利用公司的服务从事以下活动：</strong></p><p style="width:94%;margin:auto"><strong>　　1)未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</strong></p><p style="width:94%;margin:auto"><strong>　　2)未经允许，对计算机信息网络功能进行删除、修改或者增加的；</strong></p><p style="width:94%;margin:auto"><strong>　　3)未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</strong></p><p style="width:94%;margin:auto"><strong>　　4)故意制作、传播计算机病毒等破坏性程序的；</strong></p><p style="width:94%;margin:auto"><strong>　　5)其他危害计算机信息网络安全的行为。</strong></p><p style="width:94%;margin:auto"><strong>2.用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿公司与合作公司、关联公司，并使之免受损害。对此，公司有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、终止服务、限制使用、追究法律责任等措施。对恶意注册帐号或利用帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，公司有权回收其帐号。同时，公司会视司法部门的要求，协助调查。</strong></p><p style="width:94%;margin:auto">3.用户不得对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。</p><p style="width:94%;margin:auto">4.用户须对自己在使用公司服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在公司首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予公司等额的赔偿。</p><p style="width:94%;margin:auto">5.用户在使用公司服务时遵守以下互联网底线：</p><p style="width:94%;margin:auto">　　1）法律法规底线</p><p style="width:94%;margin:auto">　　2）社会主义制度底线</p><p style="width:94%;margin:auto">　　3）国家利益底线</p><p style="width:94%;margin:auto">　　4）公民合法权益底线</p><p style="width:94%;margin:auto">　　5）社会公共秩序底线</p><p style="width:94%;margin:auto">　　6）道德风尚底线</p><p style="width:94%;margin:auto">　　7）信息真实性底线</p><p style="width:94%;margin:auto"><br/></p><p style="width:94%;margin:auto">四、服务内容</p><p style="width:94%;margin:auto">1.公司网络服务的具体内容由公司根据实际情况提供。</p><p style="width:94%;margin:auto">2.除非本服务协议另有其它明示规定，公司所推出的新产品、新功能、新服务，均受到本服务协议之规范。</p><p style="width:94%;margin:auto"><strong>3.免责声明：因以下情况造成网络服务在合理时间内的中断，公司无需为此承担任何责任；</strong></p><p style="width:94%;margin:auto"><strong>（1）公司需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，公司保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利。</strong></p><p style="width:94%;margin:auto"><strong>（2）因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因；</strong></p><p style="width:94%;margin:auto"><strong>（3）用户的电脑软硬件和通信线路、供电线路出现故障的；</strong></p><p style="width:94%;margin:auto"><strong>（4）因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行原因、第三方服务瑕疵或政府行为等原因。</strong></p><p style="width:94%;margin:auto"><strong>4.公司有权于任何时间暂时或永久修改或终止本服务（或其任何部分），而无论其通知与否，公司对用户和任何第三人均无需承担任何责任。</strong></p><p style="width:94%;margin:auto"><strong>5.终止服务</strong></p><p style="width:94%;margin:auto"><strong>您同意公司得基于其自行之考虑，因任何理由，包含但不限于长时间（超过一年）未使用，或公司认为您已经违反本服务协议的文字及精神，终止您的密码、帐号或本服务之使用（或服务之任何部分），并将您在本服务内任何内容加以移除并删除。您同意依本服务协议任何规定提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，公司可立即关闭或删除您的帐号及您帐号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，您同意若本服务之使用被中断或终止或您的帐号及相关信息和文件被关闭或删除，公司对您或任何第三人均不承担任何责任。</strong></p><p style="width:94%;margin:auto"><br/></p><p style="width:94%;margin:auto"><strong>五、知识产权和其他合法权益（包括但不限于名誉权、商誉权）</strong></p><p style="width:94%;margin:auto">1.对于用户通过公司服务上传到AI你知道吗网站上可公开获取区域的任何内容，用户同意公司在全世界范围内具有免费的、永久性的、不可撤销的、非独家的和完全再许可的权利和许可，以使用、复制、修改、改编、出版、翻译、据以创作衍生作品、传播、表演和展示此等内容（整体或部分），和/或将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中。</p><p style="width:94%;margin:auto"><br/></p><p style="width:94%;margin:auto"><strong>六、青少年用户特别提示</strong></p><p style="width:94%;margin:auto">青少年用户必须遵守全国青少年网络文明公约：</p><p style="width:94%;margin:auto">要善于网上学习，不浏览不良信息；要诚实友好交流，不侮辱欺诈他人；要增强自护意识，不随意约会网友；要维护网络安全，不破坏网络秩序；要有益身心健康，不沉溺虚拟时空。</p><p style="width:94%;margin:auto"><br/></p><p style="width:94%;margin:auto"><strong>七、其他</strong></p><p style="width:94%;margin:auto">1.本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p><p style="width:94%;margin:auto">2.如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向<strong>深圳市罗湖区人民法院</strong>提起诉讼。</p><p style="width:94%;margin:auto">3.　公司未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。</p><p style="width:94%;margin:auto">4.如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p><p><br/></p>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.getSetting({
    //   success: (res) => {
    //     console.log(res)
    //   },
    //   fail: () => {
    //   }
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.reLaunch({
      url: '/pages/newIndex/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  getUser(e) {
    // console.log(e)
    if (!this.data.isAgree) {
      wx.showToast({
        title: '请先同意协议',
        icon: 'none'
      })
    } else {
      wx.getUserInfo({
        success(res) {
          const name = e.detail.userInfo.nickName
          const img = e.detail.userInfo.avatarUrl
          wx.login({
            success(res) {
              if (res.code) {
                console.log('获得到的res:', res.code)
                // 发起网络请求
                let url = config.baseUrl + 'login'
                wx.request({
                  url: url,
                  method: 'post',
                  data: {
                    name,
                    img,
                    code: res.code
                  },
                  header: {
                    'app-key': config.appKey
                  },
                  success: res => {
                    wx.setStorageSync('sessionId', res.data.token)
                    wx.setStorageSync('user_info', res.data.data)
                    let page = getCurrentPages()
                    if (page.length == 1) {
                      wx.switchTab({
                        url: '/pages/newIndex/index'
                      })
                    } else {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                    // }
                  },
                  fail: res => {
                    wx.showToast({
                      title: '登陆失败',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '登陆失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        },
        fail(res) {
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/newIndex/index'
          })
        }
      })
    }
  },

  //同意协议点击
  agreeProtocol() {
    let isAgree = this.data.isAgree
    isAgree = !isAgree
    this.setData({
      isAgree
    })
  },

  //显示协议
  showProtocol(e) {
    this.setData({
      protocolIsShow: true
    })
  },

  //确定协议
  subProtocol(e) {
    this.setData({
      protocolIsShow: false
    })
  }
})
