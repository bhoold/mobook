function firstPage(){
    var success = function(data){
            if(data.status){
                setBooklistMy(data.list.book);
                updateList();
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
        afterAjax = function(){
            appcan.window.resetBounceView(0);
        };

    var someone = getSomeone(),
        userinfo = getUserinfo();

    someone = JSON.parse(someone);
    userinfo = JSON.parse(userinfo);

    if (someone && someone.uid != userinfo.uid) {
        userinfo = someone;
    }

    ajax({
        url: SERVER.api.bookListMy,
        data: {'uid': userinfo.uid},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
}
function nextPage(type){
    $html = $('.list');

    var success = function(data){
            if(data.status){
                var page = $html.data('page')+1;
                if(data.list.book && data.list.book[0]){
                    $html.data('page', page);
                    updateList(page, data.list.book);
                    $(window).scrollTop($(window).scrollTop() + 50)
                }
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
        afterAjax = function(){
            appcan.window.resetBounceView(1);
        };

    var someone = getSomeone(),
        userinfo = getUserinfo();

    someone = JSON.parse(someone);
    userinfo = JSON.parse(userinfo);

    if (someone && someone.uid != userinfo.uid) {
        userinfo = someone;
    }

    ajax({
        url: SERVER.api.bookListMy,
        data: {
            'uid': userinfo.uid,
            'page': $html.data('page')+1,
        },
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
}
function startPullCall(type){}
function downEndCall(type){}
function upEndCall(type){
    !type ? firstPage() : nextPage();
}

function updateList(page, list){
    var page = page || 1,
        list = list || JSON.parse(getBooklistMy()),
        $html = $($('.list')[0] || $('<ul class="list" />')),
        $info;
    $html.data('page', page);
    if(list){if(page == 1){$html.empty();}
    for(var index in list){
        list[index].thumb = list[index].thumb ? list[index].thumb : "images/book-thumb.jpg";
        $info = $('<li class="item" data-id="' + list[index].id + '">\
            <p class="img"><img class="thumb" src="' + list[index].thumb + '" align="absmiddle" /></p>\
            <p class="title ut-s">' + list[index].title + '</p>\
            <p class="star"></p>\
        </li>');
        for(var i = 0; i < 5; i++){
            if(i < list[index].level){
                $info.find('p.star').append('<i class="icon-base star"></i>');
            }else{
                $info.find('p.star').append('<i class="icon-base star2"></i>');
            }
        }
        $html.append($info);
    }
    }
    $('.list')[0] || $('#container').html($html);
}

appcan.ready(function(){
    appcan.frame.setBounce([0,1], startPullCall, downEndCall, upEndCall);

    updateList();

    $(document).on(isWindows() ? "click" : "tap", "#content .item", function() {
        setBookDetailID($(this).data('id'));
        sendMsg(0, "book-detail", "window.location.reload()");
        gotoPage('book-detail', 5);
    })
});