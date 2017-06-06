//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    text: "This is pagesdf data",
    array: [1, 2, 3, 4, 5],
    view: 'APP',
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'},
    array2: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    list: []
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this

    wx.setNavigationBarTitle({
      title: '列表'
    });

    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });

    wx.request({
      url: app.globalData.server + '/bookapp/?s=/book',
      data: {},
      header: {'content-type': 'application/json'},
      success: function(res) {
        var data = res.data,
            list, books = [];
        if(data.msg == 'ok'){
          list = data.list.book;
          for(var i in list){
            var book = list[i];
            books.push(book);
          }
          that.setData({list: books})
        }
      }
    })


  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  goto: function(page){

      wx.navigateTo({url: 'page/personal'})
  }
})
