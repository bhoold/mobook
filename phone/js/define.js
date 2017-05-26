var SERVER = {};
SERVER.base = 'http://deep.huangshaoshu.com/bookapp/';
SERVER.api = {
        startpage: SERVER.base + 'Page/startpage',

        login: SERVER.base + 'Public/login',//登录

        douban: 'https://api.douban.com/v2/book/isbn/:',//isbn号查询图书
        bookList: SERVER.base + 'Book/index',//列表
        bookListGiveBack: SERVER.base + 'Book/index/type/giveBack',//还书列表
        bookListLend: SERVER.base + 'Book/index/type/lend',//借出列表
        bookListMy: SERVER.base + 'Book/index/type/my',//我的图书
        bookDetail: SERVER.base + 'Book/detail',//详情
        bookSearch: SERVER.base + 'Book/search',//搜索
        bookScanResult: SERVER.base + 'book/scanResult',
        bookUpload: SERVER.base + 'Book/upload',//上传
        bookBorrow: SERVER.base + 'Book/borrow',//借入
        bookComment: SERVER.base + 'Book/comment',//评论

        messageMy: SERVER.base + 'message/index',
        messageLend: SERVER.base + 'message/index/type/lend',

        userInfo: SERVER.base + 'Public/userInfo'

};

var CHANNEL = {
        login: -1,
        index: 1,
        personal: 2,
        upload_book: 3
}

var BOOKSTATUS = {
        nonExist: -1,//被删除
        nomal: 1,//正常的
        borrow: 2,//正在
        lend: 3,
        giveBack: 4
}

var BOOKEVENT = {
        delete: -1,//被删除
        nomal: 1,//正常的
        borrowing: 2,//正在
        lended: 3,
        giveBacking: 4,
        giveBacked: 5
}



























var isBrowser = false;