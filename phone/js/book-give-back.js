appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.book_give_back, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    var success = function(data){
            if(data.status){
                setBooklistGiveBack(data.list.book);

                var titHeight = $('#header').offset().height,
                    height = titHeight;
                appcan.window.openPopover({
                    name: "content",
                    dataType:0,
                    url: 'book-give-back-content.html',
                    top: height,
                    left: 0
                });
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

    var userinfo = JSON.parse(getUserinfo());
    ajax({
        url: SERVER.api.bookListGiveBack,
        data: {'uid': userinfo.uid},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });

})