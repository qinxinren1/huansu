Page({
  data: {
    imageURL: '',
    date: '',
    description: '',
    contact: '',
    start_time: '',
    end_time: '',
    number: '',
    imageShowed: false,
    listShowed: false,
    dateShowed: false,
    type: '换宿',
    list: [
      "伦敦",
      "巴塞罗那",
      "阿姆斯特丹"
    ],
    types: [
      { text: '换宿', value: '1' },
      { text: '出租', value: '2' }
    ]
  },
  onLoad() {
    const { goods } = this.data;
    this.setData({
      goods: {
        ...goods
      },
    });
  },
  inputTyping:function(e) {
    var that = this;
    if (e.detail.value=="") {
      return;
    }
    // listShowed=true;
    console.log(e)
    that.setData({
      inputVal: e.detail,
      listShowed: true
    });
    console.log(this.data.inputVal);
  },
  toConfirm:function(e) {
    var that = this;
    that.setData({
      inputVal: e.detail,
      listShowed: false
    });
  },
  dateDisplay() {
    console.log("clickinput");
    this.setData({ dateShowed: true });
  },
  onDateClose() {
    this.setData({ dateShowed: false });
  },
  onDateConfirm(event) {
    let {
      end,
      start
    } = event.detail;
    this.setData({
      dateShowed: false,
      start_time: start.year + "-" + start.month + "-" + start.date,
      end_time: end.year + "-" + end.month + "-" + end.date,
      date: start.year + "-" + start.month + "-" + start.date + " to " + end.year + "-" + end.month + "-" + end.date
    });
  },
  imageChoose() {
    this.setData({ imageShowed: true });
    if (imageShowed== true) {
      wx.chooseImage({
        count: 1, // 可选择的图片数量
        sizeType: ['compressed'], // 压缩图片
        sourceType: ['album', 'camera'], // 来源：相册或相机
        success:  (res)=> {
          // 将选择的图片上传到服务器
          this.uploadImage(res.tempFilePaths[0]);
        }
      })
    }
    this.setData({ imageShowed: false });
  },
  onClickList: function(e) {
    console.log("click")
    console.log(e.detail)
    console.log(e)
  },
  onNumberChange: function(e) {
    console.log(e.detail);
  },
  onGoHome() {
    wx.navigateTo({
      url: '/pages/home/home',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
  onGoProfile() {
    wx.navigateTo({
      url: '/pages/user/index',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
  onGoPost() {
    wx.navigateTo({
      url: '/pages/post/post',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
});