function firstPage(){
    scroll(0,0);
    $html = $('.list');
    var success = function(data){
            if(data.status){
                var id = $html.data('cate'),
                    page = 1;
                $html.data('page', page);
                setBooklist(id, data.list.book);
                updateList(id, page, data.list.book);
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
        beforeAjax = function(){
            $html.data('page', 1);
        },
        afterAjax = function(){
            appcan.window.resetBounceView(0);
        };

    ajax({
        url : SERVER.api.bookList,
        data : {
            'page': 1,
            'cate': $html.data('cate')
            },
        beforeSend: beforeAjax,
        complete: afterAjax,
        success : success,
        error : error
    });
}
function nextPage(type){
    $html = $('.list');
    var success = function(data){
            if(data.status){
                var id = $html.data('cate'),
                    page = $html.data('page')+1;
                if(data.list.book && data.list.book[0]){
                    $html.data('page', page);
                    updateList(id, page, data.list.book);
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
        beforeAjax = function(){}
        afterAjax = function(){
            appcan.window.resetBounceView(1);
        };
    
    ajax({
        url : SERVER.api.bookList,
        data : {
            'page': $html.data('page')+1,
            'cate': $html.data('cate')
            },
        beforeSend: beforeAjax,
        complete: afterAjax,
        success : success,
        error : error
    });
}
function startPullCall(type){}
function downEndCall(type){}
function upEndCall(type){
    !type ? firstPage() : nextPage();
}

function updateList(id, page, list){
    var id = id || 0,
        page = page || 1,
        list = list || JSON.parse(getBooklist(id)),
        $html = $($('.list')[0] || $('<div class="list" />')),
        $info;
    $html.data('cate', id).data('page', page);
    if(list){if(page == 1){$html.empty();}
        for(var index in list){
            list[index].thumb = list[index].thumb ? list[index].thumb : "images/book-thumb.jpg";
            $info = $('<a class="ub item" data-id="' + list[index].id + '">\
                        <img class="thumb" src="' + list[index].thumb + '" />\
                        <div class="ub-f1 text">\
                    <p class="title ut-s">' + list[index].title + '</p>\
                    <p class="star"></p>\
                    <p class="summary">' + list[index].summary + '</p>\
                    <p class="tip ut-s"></p>\
                    <div class="action">\
                        <button class="uc-a1 button give-back">还书</button>\
                        <button class="uc-a1 button confirm">确认还书</button>\
                        <button class="urging"><i class="icon-status alarm"></i></button>\
                    </div>\
                </div>\
            </a>');
            for(var i = 0; i < 5; i++){
                if(i < list[index].level)
                    $info.find('p.star').append('<i class="icon-base star"></i>');
                else
                    $info.find('p.star').append('<i class="icon-base star2"></i>');
            }
            if(list[index].lend_id){
                var lend_name,
                    userinfo = getUserinfo();
                userinfo = JSON.parse(userinfo);
                if(list[index].lend_id == userinfo.uid){
                    lend_name = '你';
                    $info.find('.action .give-back').addClass('current');
                }else{
                    lend_name = list[index].lend_name;
                    $info.find('.action .urging').addClass('current');
                }
                $info.find('.tip').html( lend_name + '已借阅<em>' + list[index].lendtime + '</em>天');

            }
            $html.append($info);
        }
    }
    $('.list')[0] || $('#container').html($html);
}

appcan.ready(function() {

    $(document).on(isWindows() ? "click" : "tap", "#content .item", function() {
        setBookDetailID($(this).data('id'));
        sendMsg(0, "book-detail", "window.location.reload()");
        gotoPage('book-detail', 5);
    })
})