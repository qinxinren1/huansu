Page({
  data: {
    date: '',
    start_time: '',
    end_time: '',
    number: '',
    listShowed: false,
    dateShowed: false,
    goods: {
      title: '美国伽力果（约680g/3个）',
      price: 2680,
      formatPrice: '',
      express: '免运费',
      remain: 19,
      thumb:
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
    },
    list: [
      "伦敦",
      "巴塞罗那",
      "阿姆斯特丹"
    ],
  },
  onLoad() {
    const { goods } = this.data;
    const formatPrice = `¥${(goods.price / 100).toFixed(2)}`;
    this.setData({
      goods: {
        ...goods,
        formatPrice,
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
  onClickList: function(e) {
    console.log("click")
    console.log(e.detail)
    console.log(e)
  },
  onNumberChange: function(e) {
    console.log(e.detail);
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

  sorry() {
    wx.showToast({
      title: '暂无后续逻辑~',
      icon: 'none',
    });
  },
});