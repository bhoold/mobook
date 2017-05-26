function getComment(){
    var success = function(data){
            if(data.status){
                setBookDetail(data.book);
                $('#content .other .no-comment').addClass('uhide');
                
                var $ul = $('#content .other ul');
                $ul.empty().removeClass('uhide');
                for(var index in data.book.list.comment){
                    $ul.append('<li class="ub">\
                        <div class="avatar-wrap"><p><img class="avatar" src="' + SERVER.base + data.book.list.comment[index].reviewer_avatar +'" data-uid="' + data.book.list.comment[index].reviewer_id + '" /></p></div>\
                        <div class="ub-f1 text">\
                            <p class="author ut-s">' + data.book.list.comment[index].reviewer_name +'</p>\
                            <div class="content">' + data.book.list.comment[index].content +'</div>\
                            <p class="time">' + data.book.list.comment[index].createtime +'</p>\
                        </div>\
                    </li>');
                }
            }
        },
        error = function(err){},
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
}

function getReviewer(uid){
    var success = function(data){
            if(data.status){
                data.userinfo.avatar =  SERVER.base + data.userinfo.avatar;
                setSomeone(data.userinfo);
                var userinfo = getSomeone();
                if(!userinfo){
                    openDialog({
                        callback: "custom_dialog.tip()",
                        content: "程序无法存储信息！"
                    });
                }else{
                    gotoPage('personal', 1);
                }
            }else{
                openDialog({
                    callback: "custom_dialog.tip()",
                    content: data.msg
                });
            }
        },
        error = function(err){console.log(err)
            openDialog({
                callback: "custom_dialog.tip()",
                content: "连接服务器失败！"
            });
        },
        beforeAjax = function(){},
        afterAjax = function(){};

    ajax({
        url: SERVER.api.userInfo,
        data: {'uid': uid},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
}

appcan.ready(function() {
    var bookInfo = JSON.parse(getBookDetail()),
        userinfo = JSON.parse(getUserinfo());

    appcan.initBounce();

    appcan.button("#call", "", function(){
        openDialog({
            callback: 'custom_dialog.confirm()',
            content: '<div style=\'text-align:center;line-height:2em;\'>' + bookInfo.owner_mobile + '</div>',
            ok: 'uexCall.call(' + bookInfo.owner_mobile + ');', 
            title: bookInfo.owner_name, 
            okText: '呼叫'
        });
    });

    $(document).on(isWindows() ? "click" : "tap", "#content img.avatar", function() {
        getReviewer($(this).data('uid'));
    })


    $('#content .info .title').text(bookInfo.title);
    $('#content .bookimg .thumb').prop('src', bookInfo.thumb);

    
    for(var i = 0; i < 5; i++){
        if(i < bookInfo.level){
            $('#content .info .level').append('<i class="icon-base star"></i>');
        }else{
            $('#content .info .level').append('<i class="icon-base star2"></i>');
        }
    }
    $('#content .info .suggest i').text(bookInfo.deadline_title);
    $('#content .owner img').prop('src', SERVER.base + bookInfo.owner_avatar).data('uid',  bookInfo.owner_id);
    $('#content .owner span,#content .summary-title span').text(bookInfo.owner_name);
    $('#content .summary .content').text(bookInfo.summary);

    if(bookInfo.owner_id == userinfo.uid){
        $("#call").addClass("uhide");
    }else{
        $("#call").removeClass("uhide");
    }



    if(bookInfo.list.comment[0]){
        var $ul = $('#content .other ul');
        $ul.empty().removeClass('uhide');
        for(var index in bookInfo.list.comment){
            $ul.append('<li class="ub">\
                <div class="avatar-wrap"><p><img class="avatar" src="' + SERVER.base + bookInfo.list.comment[index].reviewer_avatar +'" data-uid="' + bookInfo.list.comment[index].reviewer_id + '" /></p></div>\
                <div class="ub-f1 text">\
                    <p class="author ut-s">' + bookInfo.list.comment[index].reviewer_name +'</p>\
                    <div class="content">' + bookInfo.list.comment[index].content +'</div>\
                    <p class="time">' + bookInfo.list.comment[index].createtime +'</p>\
                </div>\
            </li>');
        }
    }else{
        $('#content .other .no-comment').removeClass('uhide');
    }

    
})