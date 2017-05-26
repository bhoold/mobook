function borrow(){
    var success = function(data){
            if(data.status){
                $('#footer p.action.enabled').addClass('uhide');
                $('#footer p.action.disabled').removeClass('uhide');
               sendMsg(1, "", "content", "$('#content .bookimg .lent').removeClass('uhide');$('#content .bookimg .suggest').addClass('uhide');");
            }
            openDialog({
                callback: "custom_dialog.tip()",
                content: data.msg
            });
        },
        error = function(err){console.log(err)
            openDialog({
                callback: "custom_dialog.tip()",
                content: "连接服务器失败！"
            })
        },
        beforeAjax = function(){},
        afterAjax = function(){};

    var bookInfo = JSON.parse(getBookDetail()),
        userinfo = JSON.parse(getUserinfo());
    if(bookInfo.owner_id == userinfo.uid){
        setTimeout(function(){openDialog({callback: "custom_dialog.tip()",content: "不能自己借自己"});},1000);
        return false;
    }
    ajax({
        url: SERVER.api.bookBorrow,
        data: {
            'bookID': getBookDetailID(),
            'obligee': bookInfo.owner_id,
            'loanee': userinfo.uid
        },
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
}


appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.book_detail, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    appcan.button("#header .right a.btn", "", function(){
        gotoPage('comment', 10);
    });

    var success = function(data){
            if(data.status){
                var userinfo = JSON.parse(getUserinfo());
                setBookDetail(data.book);
                appcan.button("#footer p.msg", "", function(){
                    gotoPage('chat', 10);
                });

                appcan.button("#footer p.call", "", function(){
                    var vdata = '{content: "<div style=\'text-align:center;line-height:2em;\'>' + data.book.owner_name + '<br />' + data.book.owner_mobile + '</div>",ok: "uexCall.call(' + data.book.owner_mobile + ');", title: "拨打电话", okText: "呼叫"}'
                    openDialog({callback: "custom_dialog.confirm(" + vdata +")"});
                });

                appcan.button("#footer p.action.enabled", "", function(){
                    var vdata = '{content: "<div style=\'text-align:center;line-height:2em;\'>你确认要借阅' + data.book.owner_name +'的<br />《' + data.book.title +'》?</div>",ok: "sendMsg(0,\'book-detail\',\'borrow();\');", title: "通知", okText: "确认"}'
                    openDialog({callback: "custom_dialog.confirm(" + vdata +")"});
                });

                $('#header .middle').text(data.book.title);

                var titHeight = $('#header').offset().height,
                    footHeight = $('#footer').offset().height,
                    height = titHeight;
                /*
                if(data.book.owner_id != userinfo.uid){
                    $('#footer').removeClass('uhide');
                }
                */
                appcan.window.openPopover({
                    name: "content",
                    dataType:0,
                    url: 'book-detail-content.html',
                    top: height,
                    left: 0,
                    height: $('#content').offset().height
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

    ajax({
        url: SERVER.api.bookDetail,
        data: {'id': getBookDetailID()},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });

})