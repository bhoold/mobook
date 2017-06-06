//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',

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

    userInfo: {},
    books: [],
    bookDetail: null,
    cates: []
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this

    wx.setNavigationBarTitle({
      title: '列表'
    });

    app.getUserInfo(function(userInfo){
      that.setData({userInfo: userInfo});
    });

    app.getBookCates(function(list){
      that.setData({cates: list});
    });

    app.getBookList(function(list){
      that.setData({books: list});
    });

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
  showPagePersonal: function(){
      wx.navigateTo({url: '../personal/index'})
  },
  showResult: function(){

  },
  showScaner: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) { // ITF, EAN_8, EAN_13, CODABAR, CODE_93, UPC_E
        if(res.scanType == 'EAN_13'){
          //res.result;
        }
        console.log(res);
      },
      fail: function(argument) {},
      complete: function(argument) {}

    });
  },
  getBookList: function(e){
    var that = this,
        dataset = e.currentTarget.dataset,
        id = dataset.itemid;
    app.getBookList(function(list){
      that.setData({books: list});
    }, id);
  },
  showBookDetail: function(e){
    var that = this,
        dataset = e.currentTarget.dataset,
        id = dataset.itemid;
    app.getBookDetail(function(bookDetail){
      that.setData({bookDetail: bookDetail});
      console.log(bookDetail)
      //wx.navigateTo({url: '../bookDetail/index'})
    }, id);
  }
})
