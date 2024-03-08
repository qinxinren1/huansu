//inputVal: 地点，city
//date: 入住日期
//number: 入住人数
Page({
  data: {
    date: '',
    active: 0,
    inputVal: '',
    start_time: '',
    end_time: '',
    number: '',
    listShowed: false,
    dateShowed: false,
    list: [
    ],
  },
  onLoad() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping:function(e) {
    // var that = this;
    // if (e.detail.value=="") {
    //   return;
    // }
    // // listShowed=true;
    // console.log(e)
    // that.setData({
    //   inputVal: e.detail,
    //   listShowed: true
    // });
    // console.log(this.data.inputVal);

    // new
    var that = this;
    if (e.detail.value=="") {
      return;
    }
    const db = wx.cloud.database()
    db.collection('test').field({
      name:true,
    }).where({
      name: db.RegExp({
        regexp: '.*' + e.detail + '.*',
        options: 'i',
      })
    })
    .get({
      success: function(res) {
        console.log(res.data);
        // console.log(res.data[0]['name']);
        var names = []
        for (var i = 0; i < res.data.length; i ++) {
          names.push(res.data[i].name)
        };
        that.setData({
          list: names
        })

        console.log(list)
      }
    })
    that.setData({
      inputVal: e.detail,
      listShowed: true
    });
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
    console.log(event.detail)
    var start_month, end_month;
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
    this.setData({
      dateShowed: false,
      start_time: start.year + "-" + start_month + "-" + start.date,
      end_time: end.year + "-" + end_month + "-" + end.date,
      date: start.year + "-" + start_month + "-" + start.date + " to " + end.year + "-" + end_month + "-" + end.date
    });
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
  onNumberChange: function(e) {
    console.log(e.detail);
    this.setData({  
      number: e.detail,
    });
  },
  onClickCart() {
    wx.navigateTo({
      url: '/pages/cart/index',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开购物车失败',
        });
      },
    });
  },

  onClickUser() {
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
  onClickSearch() {
    wx.setStorageSync('location', this.data.inputVal);
    wx.setStorageSync('number', this.data.number);
    wx.setStorageSync('startDate', this.data.start_time);
    wx.setStorageSync('endDate', this.data.end_time);
    wx.navigateTo({
      url: '/pages/home/home'
    });
  },
  onClickButton() {
    wx.showToast({
      title: '暂无后续逻辑~',
      icon: 'none',
    });
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
  sorry() {
    wx.showToast({
      title: '暂无后续逻辑~',
      icon: 'none',
    });
  },
});