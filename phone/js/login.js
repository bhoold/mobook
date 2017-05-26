function postForm() {
    var success = function(data){
            if(typeof data !== "object")data = JSON.parse(data);
            if(data.status){data.userinfo.avatar =  SERVER.base + data.userinfo.avatar;
                setUserinfo(data.userinfo);
                var userinfo = getUserinfo();
                if(!userinfo){
                    custom_dialog.tip({content: "程序无法存储信息！"});
                }else{
                    sendMsg(0, 'root', 'init2()');
                    gotoPage('index',5);
                    setTimeout(function(){closePage();},2000)
                }
            }else{
                custom_dialog.tip({content: data.msg});
            }
        },
        error = function(err){
            custom_dialog.tip({content: "连接服务器失败！"});
        },
        beforeAjax = function(){
            custom_dialog.loading({content: "正在登录"});
        },
        afterAjax = function(){
            custom_dialog.loading({action: "hide"});
        };

        $('form').prop('action', SERVER.api.login)
        appcan.request.postForm($('form'), success, error, beforeAjax, afterAjax);
};


appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.login, function(msg){
        eval(msg)
    });
    $("form").on('submit', function() {
        var account = appcan.trim($('#form .account input').val()),
            pwd = appcan.trim($('#form .pwd input').val());
        if(!account.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) || pwd.length < 6){
            custom_dialog.alert({content: "帐号或密码格式不对<br />手机号码11位数字<br />密码最少6位字符"});
        }else{
            postForm();
        }
        return false;
    });
})