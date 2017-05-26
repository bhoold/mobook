appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.message, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    appcan.button("#content .item.chat", "", function(){
        gotoPage('chat', 10);
    });
    appcan.button("#content .item.urge", "", function(){
        gotoPage('message-give-back', 10);
    });
    appcan.button("#content .item.comment", "", function(){
        gotoPage('message-give-back', 10);
    });
    appcan.button("#content .item.lend", "", function(){
        gotoPage('message-give-back', 10);
    });
    appcan.button("#content .item.give-back", "", function(){
        gotoPage('message-give-back', 10);
    });

    var success = function(data){
            if(data.status){
                setBooklistMy(data.list.book);

                var titHeight = $('#header').offset().height,
                    height = titHeight;
                appcan.window.openPopover({
                    name: "content",
                    dataType:0,
                    url: 'message-my-content.html',
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
    /*
    ajax({
        url: SERVER.api.message_my,
        data: {'uid': userinfo.uid},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
*/
})