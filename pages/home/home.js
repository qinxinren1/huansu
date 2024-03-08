Page({
  data: {
    active: 0,
    searchRes: {},
    list:new Array(10).fill("https://img.yzcdn.cn/vant/cat.jpeg")
  },
  onLoad() {
    var that = this;
    const location = wx.getStorageSync('location');
    const number = wx.getStorageSync('number');
    const startDate = wx.getStorageSync('startDate');
    const endDate = wx.getStorageSync('endDate');
    console.log(location, number, startDate, endDate)
    console.log(number)
    this.setData({
      active: 0,
    });
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('HouseInfo').where({
      location: db.RegExp({
        regexp: '^.*' + location + '.*',
      }),
      capacity: _.gte(1),
      start_date: _.lte(startDate),
      end_date: _.gte(endDate),
    })
    .get({
      success: function(res) {
        console.log(res);
        that.setData({
          searchRes: res.data
        })
        console.log(that.data.searchRes)
      }
    })
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
  onClickHouse(){
    wx.navigateTo({
      url: '/pages/details/details',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    })
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