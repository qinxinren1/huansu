Page({
  data: {
    active: 0,
    goods: {
      title: '美国伽力果（约680g/3个）',
      price: 2680,
      formatPrice: '',
      express: '免运费',
      remain: 19,
      thumb:
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
    },
    list:new Array(10).fill("https://img.yzcdn.cn/vant/cat.jpeg")
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
  onClickSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开搜索失败',
        });
      },
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