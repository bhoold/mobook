function addCate(){
    var bookcate, $html, i = 0;
    bookcate = JSON.parse(getBookcate());
    $html = $('<div id="tab" class="ub"><div data-id="0" class="ub-f1 item-0"><a><span>全部</span></a></div></div>');
    for(var index in bookcate){
        i++;
        $html.append('<div data-id="' + bookcate[index].id + '" class="ub-f1  item-' + i +'"><a><span>' + bookcate[index].title + '</span></a></div>');
    };
    $html.find('.ub-f1').eq($html.find('.ub-f1').length - 1).addClass('last');
    $('#tab').html($html.html());
    $('#tab .ub-f1').each(function(){
        $(this).data('index-pos', $(this).offset().left + $(this).width()/2)
    });
}
function showContent($elem){
    var titHeight = $('#header').offset().height,
        tabHeight = $('#tab').offset().height,
        height = titHeight + tabHeight;
    if(!$("#content").data("inited")){
        $("#content").data("inited", true);
        appcan.window.openPopover({
            name: "content-mask",
            dataType:0,
            url: 'index-content-mask.html',
            top: height,
            left: 0
        });
    }
    appcan.window.bringPopoverToFront('content-mask');

    var id = $elem.index();
    if(!$elem.data("inited")){
        $elem.data("inited", true);
        appcan.window.openPopover({
            name: "content" + id,
            dataType:0,
            url: 'index-content-' + id + '.html',
            top: height,
            left: 0
        });
    }

    appcan.window.bringPopoverToFront('content' + id);
}
function getContent(index){
    var id = $('#tab .ub-f1').eq(index).data('id');
    sendMsg(1,'index','content' + index, 'updateList(' + id +',1)');
}

function addSearchview(){
    appcan.window.bringPopoverToFront('content-mask');
    appcan.window.openPopover({
        name: "search-content",
        dataType:0,
        url: 'index-search-content.html',
        top: $('#header').offset().height,
        left: 0
    });
    appcan.window.bringPopoverToFront('search-content');
    $("#header .middle form input").data('searchView-ok', true);
}
function searchReady(){
    var key = appcan.trim($("#header .middle form input").val());
    var success = function(data){
            if(data.status){
                setSearchResult(data.list.book);
            }else{
                setSearchResult(data.msg);
            }
            sendMsg(1, "index", "search-content", "result();");
        },
        error = function(err){
            setSearchResult("连接服务器失败！");
            sendMsg(1, "index", "search-content", "result();");
        },
        beforeAjax = function(){},
        afterAjax = function(){};

    ajax({
        url: SERVER.api.bookSearch,
        data: {'str': key},
        beforeSend: beforeAjax,
        complete: afterAjax,
        success: success,
        error: error
    });
}


function openScanner(){
    var cText = 0;
    var cJson = 1;
    var cInt = 2;

    uexScanner.cbOpen = ScannerSuccessCallBack;
    uexWidgetOne.cbError = ScannerFailedCallBack;
    uexScanner.open("ZBar");

    function ScannerSuccessCallBack(opCode, dataType, data) {
        switch(dataType) {
            case cText:
                openDialog({
                    callback: "custom_dialog.tip()",
                    content: "uex.cText错误"
                });
                break;
            case cJson:
                setScanResult(data);
                gotoPage('upload-book', 5);
                break;
            case cInt:
                openDialog({
                    callback: "custom_dialog.tip()",
                    content: "uex.cInt错误"
                });
                break;
            default:
                openDialog({
                    callback: "custom_dialog.tip()",
                    content: "扫描失败!"
                });
        }
    }
    function ScannerFailedCallBack(data) {
        openDialog({
            callback: "custom_dialog.tip()",
            content: data
        });
    }
}

function upLoadSuccess(){
    var appConfig = getAppConfig(),
        strList = [],
        str;

    try{
        appConfig = JSON.parse(appConfig);
    }catch(e){}
    if(typeof appConfig === "object"){
        for(var i in appConfig){
            if(appConfig[i].key === "struploadsuccess"){
                strList.push(appConfig[i].value)
            }
        }
    }
    if (strList.length) {
        str = strList[random(0, strList.length - 1)];
    }else{
        str = "上传成功";
    }
    
    $('#tab a').eq(0).trigger(isWindows() ? "click" : "tap");
    openDialog({
        callback: 'custom_dialog.alert()',
        content: '<p style="font-weight: bold;color: #333;text-align: center;line-height: 1.8em;margin-top: 4em;}">'+str+'</p><p style="font-size: 0.8em;text-align: center;margin-top: 1em;">感谢您的贡献</p>',
        title: '<span style="position: absolute;background: #3f99f2;margin: 0;color: #fff;border-radius: 50%;left: 50%;margin-left: -2.2em;margin-top: -3.2em;padding: .7em;"><i class="icon-base success" style="font-size: 3em;"></i></span>'
    });
    sendMsg(1,'index','content'+$('#tab .ub-f1').eq(0).data('id'),'firstPage()');
}


appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.index, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        setSomeone(0)
        gotoPage('personal', 1);
    });

    appcan.button("#header .right a.btn", "", function(){
        openScanner();
    });

    $("#header .middle form input").on("focus", function(){
        $("#header").addClass("active");
    })

    $("#header .middle form button").click(function(){
        var $input = $("#header .middle form input");
        var key = appcan.trim($input.val());
        
        if(appcan._.isEmpty(key)){
            return false;
        }
        if($input.attr("data-last-key") === key){
            return false;
        }
        $input.attr("data-last-key", key);
        $("#tab").addClass("uhide");
        if($("#header .middle form input").data('searchView-ok')){
            searchReady();
        }else{
            addSearchview();
        }
        
    })

    $("#header .middle a").click(function(){
        $("#header").removeClass("active");
        $("#tab").removeClass("uhide");
        $("#header .middle form input").val("").attr("data-last-key", "").data("searchView-ok", false);
        sendMsg(1, "index", "search-content", "closePage();");
        appcan.window.bringPopoverToFront('content' + $('#tab .ub-f1.active').data('id'));
    });

    $(document).on(isWindows() ? "click" : "tap", "#tab a", function() {
        var $elem = $(this).closest('.ub-f1'),
            pos = $elem.data('index-pos'),
            $elemCSS = $("#tmpCSS");
        if($elem.hasClass('active')){return false;}
        $elem.addClass('active').siblings().removeClass('active');

        if(!$elemCSS[0]){
            $elemCSS = $("<style id=\"tmpCSS\" />");
            $("head").append($elemCSS);
        }
        $elemCSS.html("#tab:after{-webkit-transform:translate3d("+pos+"px, 0, 0);transform:translate3d("+pos+"px, 0, 0);}")
        showContent($elem);
    })

    var userinfo = getUserinfo();
    if(!userinfo){
        gotoPage('login');
        setTimeout(function(){closePage();},2000)
    }else{
        userinfo = JSON.parse(userinfo);
        $('#header .left img').prop('src', userinfo.avatar);
        addCate();
        $('#tab a').eq(0).trigger(isWindows() ? "click" : "tap");
    }
});