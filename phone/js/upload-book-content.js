function getBookInfo(){
	var isbn = JSON.parse(getScanResult()),
		userinfo = JSON.parse(getUserinfo()),
		url = SERVER.api.douban + isbn.code;

    var success = function(data){
            if(data){
                $('#title').val(data.title);
                $('#thumb').val(data.image);
                $('#isbn').val(data.isbn13);
                $('#content .title').text(data.title);
		    	$('#content .thumb').prop('src', data.image);
                //$('#summary').val(data.summary);
                $('#owner_id').val(userinfo.uid);
                //setUploadBookInfo(data);
            }else{
                openDialog({
                    callback: "custom_dialog.alert()",
                    content: "无法解析获取的数据",
                    ok: "sendMsg(0,'upload-book','closePage();');"
                });
            }
        },
        error = function(err){
            openDialog({
                callback: "custom_dialog.alert()",
                content: "没有这本书的资料!",
                ok: "sendMsg(0,'upload-book','closePage();');"
            });
        },
        beforeAjax = function(){
            $('#content .loading').removeClass('uhide');
        },
        afterAjax = function(){
            $('#content .loading').addClass('uhide');
        };

    if(!isbn.code){
        openDialog({
            callback: "custom_dialog.alert()",
            content: "扫描失败!",
            ok: "sendMsg(0,'upload-book','closePage();');"
        });
        return false;
    }
    $('#content .isbn').text(isbn.code);
    ajax({
        url : url,
        beforeSend: beforeAjax,
        complete: afterAjax,
        success : success,
        error : error
    });
}

function postForm() {
    var success = function(data){
            if(typeof data !== "object")data = JSON.parse(data);
            //setUploadResult(JSON.stringify(data))
            if(data.status){
                var userinfo = JSON.parse(getUserinfo());
                userinfo.bookCount = String(Number(userinfo.bookCount) + 1);
                setUserinfo(userinfo);

                sendMsg(0,'index','upLoadSuccess()');
                sendMsg(0,'upload-book',"closePage();");
            }else{
                openDialog({
                    callback: "custom_dialog.alert()",
                    content: data.msg
                });
            }
        },
        error = function(err){
            openDialog({
                callback: "custom_dialog.tip()",
                content: "连接服务器失败!"
            });
        },
        beforeAjax = function(){
            custom_dialog.loading({content: "提交中"})
        },
        afterAjax = function(){
            custom_dialog.loading({action: "hide"})
        };
    ajax({
        url: SERVER.api.bookUpload,
        type: 'post',
        data: {
            title : appcan.trim($('#title').val()),
            thumb : appcan.trim($('#thumb').val()),
            isbn : appcan.trim($('#isbn').val()),
            summary : appcan.trim($('#summary').val()),
            level : appcan.trim($('#level').val()),
            cate_id : appcan.trim($('#cate_id').val()),
            deadline_id : appcan.trim($('#deadline_id').val()),
            owner_id : appcan.trim($('#owner_id').val())
        },
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
    /*
    appcan.ajax({
        url: SERVER.api.bookUpload,
        type: 'post',
        data: {
            title : appcan.trim($('#title').val()),
            thumb : appcan.trim($('#thumb').val()),
            isbn : appcan.trim($('#isbn').val()),
            summary : appcan.trim($('#summary').val()),
            level : appcan.trim($('#level').val()),
            cate_id : appcan.trim($('#cate_id').val()),
            deadline_id : appcan.trim($('#deadline_id').val()),
            owner_id : appcan.trim($('#owner_id').val())
        },
        dataType: 'json',
        appVerify: true,
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
*/
};

$("form").on('submit', function() {
    var title = appcan.trim($('#title').val()),
        thumb = appcan.trim($('#thumb').val()),
        isbn = appcan.trim($('#isbn').val()),
        summary = appcan.trim($('#summary').val()),
        level = appcan.trim($('#level').val()),
        cate_id = appcan.trim($('#cate_id').val()),
        deadline_id = appcan.trim($('#deadline_id').val()),
        owner_id = appcan.trim($('#owner_id').val());

    if(summary.length < 1 || thumb.length < 1 || title.length < 1 || isbn.length < 1 || level.length < 1 || cate_id.length < 1 || deadline_id.length < 1 || owner_id.length < 1){
        openDialog({
            callback: "custom_dialog.alert()",
            content: "不能上传。请确认已经点评并且已选择图书类型和阅读时间!"
        });
    }else{
        postForm();
    }
    return false;
});



appcan.ready(function(){
    appcan.initBounce();

    appcan.button(".form .item a.btn", "", function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        $('#' + $(this).data('name')).val($(this).data('value'));
    });
    appcan.button(".form .item a.star", "", function(){
        for(var i = 0; i < 5; i++){
            if(i < $(this).index())
                $($(".form .item a.star i")[i]).addClass('star').removeClass('star2');
            else
                $($(".form .item a.star i")[i]).addClass('star2').removeClass('star');
        }
        $('#level').val($(this).index());
    });
    getBookInfo();
});
