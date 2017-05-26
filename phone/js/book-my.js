function showContent(){
    var titHeight = $('#header').offset().height,
        height = titHeight;
    appcan.window.openPopover({
        name: "content",
        dataType:0,
        url: 'book-my-content.html',
        top: height,
        left: 0
    });
}
appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.book_my, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    var success = function(data){
            if(data.status){
                setBooklistMy(data.list.book);
                showContent();
            }else{
                openDialog({
                    callback: "custom_dialog.tip()",
                    content: data.msg
                });
            }
        },
        error = function(err){
            openDialog({
                callback: "custom_dialog.tip()",
                content: "连接服务器失败！"
            });
        },
        beforeAjax = function(){},
        afterAjax = function(){};

    var someone = getSomeone(),
        userinfo = getUserinfo();

    someone = JSON.parse(someone);
    userinfo = JSON.parse(userinfo);

    if (someone && someone.uid != userinfo.uid) {
        userinfo = someone;
        $('#header .middle').text('Ta的图书');
    }else{
        $('#header .middle').text('我的图书');
    }

    ajax({
        url: SERVER.api.bookListMy,
        data: {'uid': userinfo.uid},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });

})