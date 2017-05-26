function postForm(){
    var success = function(data){
            if(data.status){
                sendMsg(1, "book-detail", "content", "getComment()");
                sendMsg(0, "book-detail", "openDialog({callback: \"custom_dialog.tip()\",content: \"评论成功\"});");
                sendMsg(0, "comment", "closePage();");
                
            }else{
                openDialog({
                    callback: "custom_dialog.tip()",
                    content: data.msg,
                });
            }
        },
        error = function(err){
            openDialog({
                callback: "custom_dialog.tip()",
                content: "连接服务器失败！",
            });
        },
        beforeAjax = function(){},
        afterAjax = function(){};
    var userinfo = JSON.parse(getUserinfo());
    appcan.ajax({
        url: SERVER.api.bookComment,
        type: 'post',
        data: {
            book_id: getBookDetailID(),
            content: appcan.trim($('textarea').val()),
            reviewer_id: userinfo.uid
        },
        dataType: 'json',
        appVerify: true,
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });

}


$("form").on('submit', function() {
    var content = appcan.trim($('textarea').val());

    if(content.length < 1){
        openDialog({
            callback: "custom_dialog.tip()",
            content: "未检测到你的评论",
        });
    }else{
        postForm();
    }
    return false;
});

appcan.ready(function() {
    appcan.initBounce();

})