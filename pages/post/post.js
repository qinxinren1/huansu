Page({
  data: {
    active: 0,
    inputVal: '',
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
    // uploadImgPath: '',
    userImagePath: '',
    type: 0,
    typeStr: '换宿',
    gender: '女',
    genderVal: 0,
    list: [
      "伦敦",
      "巴塞罗那",
      "阿姆斯特丹"
    ],
    types: [
      { text: '换宿', value: 0 },
      { text: '出租', value: 1 }
    ],
    genders: [
      { text: '女', value: 0 },
      { text: '男', value: 1 },
      { text: '不限', value: 2 },
    ]
  },
  onLoad() {
    const { goods } = this.data;
    this.setData({
      active: 1
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
    var start_month, end_month;
    var start_date, end_date;
    if (start.month < 10) {
      start_month = '0' + start.month;
    }
    else {
      start_month = start_month.month;
    }
    if (end.month < 10) {
      end_month = '0' + end.month;
    }
    else {
      end_month = end.month;
    }
    if (start.date < 10) {
      start_date = '0' + start.date;
    }
    else {
      start_date = start.date;
    }
    if (end.date < 10) {
      end_date = '0' + end.date;
    }
    else {
      end_date = end.date;
    }
    this.setData({
      dateShowed: false,
      start_time: start.year + "-" + start_month + "-" + start_date,
      end_time: end.year + "-" + end_month + "-" + end_date,
      date: start.year + "-" + start_month + "-" + start_date + " to " + end.year + "-" + end_month + "-" + end_date
    });
  },
  onChangeType:function(e) {
    // console.log(e.detail)
    // console.log(this.data.types[e.detail]['text'])
    this.setData({
      type: e.detail,
      typeStr: this.data.types[e.detail]['text']
    })
    // console.log(this.data.typeStr)
  },
  onChangeGender:function(e) {
    // console.log(e.detail)
    // console.log(this.data.types[e.detail]['text'])
    this.setData({
      genderVal: e.detail,
      gender: this.data.genders[e.detail]['text']
    })
    // console.log(this.data.typeStr)
  },
  imageChoose() {
    var that = this;
    if (this.data.imageShowed== false) {
      that.setData({ imageShowed: true });
      wx.chooseImage({
        count: 1, // 可选择的图片数量
        sizeType: ['compressed'], // 压缩图片
        sourceType: ['album', 'camera'], // 来源：相册或相机
        success:  (res)=> {
          // 将选择的图片上传到服务器
          that.data.imageShowed = false
          this.uploadImage(res.tempFilePaths[0]);
        }
      });
      this.setData({ imageShowed: false});
    }
    this.setData({ imageShowed: false});
    this.setData({ imageShowed: false });
  },
  uploadImage(uploadPath) {
    var that = this;
    let cloudPath = "userPhoto/" + Date.now() + ".jpg";
    wx.cloud.uploadFile({
      cloudPath,
      filePath: uploadPath
    }).then((res)=>{
      console.log(res);
      this.setData({
        imageURL: res.fileID,
        userImagePath: res.fileID,
        imageShowed: false
      })
    })
  },
  onClickList: function(e) {
    console.log("click")
    console.log(e.detail)
    console.log(e)
    this.setData({  
      inputVal: e._relatedInfo.anchorTargetText,
      listShowed: false
    });
  },
  onClickSearch() {
    var that = this;
    const db = wx.cloud.database()
    const _ = db.command
    console.log(that.data.number)
    db.collection('HouseInfo').add({
      data: {
        capacity: Number(that.data.number),
        description: that.data.description,
        end_date: that.data.end_time,
        gender: that.data.gender,
        location: that.data.inputVal,
        picPath: that.data.userImagePath,
        rules: that.data.description,
        start_date: that.data.start_time,
        tags: "",
        type: that.data.typeStr,
        contact: that.data.contact,
      }
    })
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    });
    console.log("here")
    wx.navigateTo({
      url: '/pages/home/home',
    });
  },
  onNumberChange: function(e) {
    // console.log(e.detail);
    this.setData({
      number: e.detail,
    })
  },
  onDesChange: function(e) {
    // console.log(e.detail);
    this.setData({
      description: e.detail,
    })
  },
  onContactChange: function(e) {
    // console.log(e.detail);
    this.setData({
      contact: e.detail,
    })
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
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
});