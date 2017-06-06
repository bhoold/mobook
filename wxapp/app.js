//app.js
App({
  onLaunch: function () {

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getSystemInfo({
      success: function(res){
        //console.log(res);
      }
    })
  },
  onShow: function () {},
  onHide: function () {},
  onError: function () {},
  saveDeviceInfo: function(info){

  },
  getUserInfo: function(cb){
    var that = this;
    if(that.globalData.userInfo){
      typeof cb == "function" && cb(that.globalData.userInfo);
    }else{
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  getBookCates: function(cb){
    var that = this;
    if(that.globalData.bookCates){
      typeof cb == "function" && cb(that.globalData.bookCates);
    }else{
      wx.request({
        url: that.globalData.server + '/bookapp/?s=/book/cate',
        data: {},
        header: {'content-type': 'application/json'},
        success: function(res) {
          var data = res.data,
              list, cates = [];
          if(data.msg == 'ok'){
            that.globalData.bookCates = data.list.cate;
            typeof cb == "function" && cb(that.globalData.bookCates);
          }
        }
      });
    }
  },
  getBookList: function(cb, id){
    var that = this,
        id = id || 0;
    if(that.globalData.bookList[id]){
      typeof cb == "function" && cb(that.globalData.bookList[id]);
    }else{
      wx.request({
        url: that.globalData.server + '/bookapp/?s=/book',
        method: 'GET',
        data: {cate: id},
        header: {'content-type': 'application/json'},
        success: function(res) {
          var data = res.data,
              list, books = [];
          if(data.msg == 'ok'){
            list = data.list.book;
            for(var i in list){
              books.push(list[i]);
            }
            that.globalData.bookList[id] = books;
            typeof cb == "function" && cb(books);
          }
        }
      });
    }
  },
  getBookDetail: function(cb, id){
    var that = this,
        id = id || 0;
    if(that.globalData.bookDetail[id]){
      typeof cb == "function" && cb(that.globalData.bookDetail[id]);
    }else{
      wx.request({
        url: that.globalData.server + '/bookapp/?s=/book/detail',
        method: 'GET',
        data: {id: id},
        header: {'content-type': 'application/json'},
        success: function(res) {
          var data = res.data,
              bookDetail;
          if(data.msg == 'ok'){
            bookDetail = data.book;
            that.globalData.bookDetail[id] = bookDetail;
            typeof cb == "function" && cb(bookDetail);
          }
        }
      });
    }
  },


  globalData:{
    server: 'https://www.huangshaoshu.com',
    userInfo: null,
    bookCates: null,
    bookList: {},
    bookDetail: {}
  }
})