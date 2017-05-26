var custom_dialog = {
    alert: function(opt) {
        var show = function(options){
            $('#mask,#custom-alert').removeClass('uhide');
            if(options.content)$('#custom-alert .content').html(options.content);

            if(!$('#custom-alert .ok').data('click')){
                $('#custom-alert .ok').data('click', 1);
                appcan.button("#custom-alert .ok", "", function() {
                    $('#mask,#custom-alert').addClass('uhide');
                    typeof options.ok == "function" ? options.ok() : eval(options.ok);
                    closeDialog();
                })
            }
        };

        var options;

        if(opt){
            options = appcan.extend({
                content: JSON.parse(getDialog()) && (JSON.parse(getDialog())).content,
                mask: true
            }, opt);
        }else{
            options = appcan.extend({
                content: "内容",
                mask: true
            }, JSON.parse(getDialog()) || {});
        }

        options.mask ? $('#mask')[0] ? "" : $('body').append('<div id="mask" class="uhide" />') : "";
        $('#custom-alert')[0] ? show(options) : $('body').append('<div id="custom-alert" class="custom-dialog uhide">\
            <p class="title">' + (options.title || "通知") + '</p>\
            <div class="content"></div>\
            <p class="btns"><button class="ok">确定</button></p>\
            </div>'),show(options);
    },
    confirm: function(opt){
        var show = function(options){
            $('#mask,#custom-confirm').removeClass('uhide');
            if(options.content)$('#custom-confirm .content').html(options.content);

            if(!$('#custom-confirm .ok').data('click')){
                $('#custom-confirm .ok').data('click', true);
                appcan.button("#custom-confirm .cancel", "", function() {
                    $('#mask,#custom-confirm').addClass('uhide');
                    typeof options.cancel == "function" ? options.cancel() : eval(options.cancel);
                    closeDialog();
                })
                appcan.button("#custom-confirm .ok", "", function() {
                    $('#mask,#custom-confirm').addClass('uhide');
                    typeof options.ok == "function" ? options.ok() : eval(options.ok);
                    closeDialog();
                })
            }
        };
        var options;

        if(opt){
            options = appcan.extend({
                        content: JSON.parse(getDialog()) && (JSON.parse(getDialog())).content,
                        okText: "确定",
                        cancelText: "取消",
                        mask: true
                    }, opt);
        }else{
            options = appcan.extend({
                        content: "内容",
                        okText: "确定",
                        cancelText: "取消",
                        mask: true
                    }, JSON.parse(getDialog()) || {});
        }

        options.mask ? $('#mask')[0] ? "" : $('body').append('<div id="mask" class="uhide" />') : "";
        $('#custom-confirm')[0] ? show(options) : $('body').append('<div id="custom-confirm" class="custom-dialog uhide">\
            <p class="title">' + (options.title || "") + '</p>\
            <div class="content"></div>\
            <p class="btns"><button class="cancel" style="width:50%;">' + options.cancelText + '</button><button class="ok" style="width:50%;">' + options.okText + '</button></p>\
            </div>'),show(options);
    },
    loading: function(options){
        if(options.action == "hide"){
            $('#toast-mask,#toast-loading').addClass('uhide');
            closeDialog();
            return false;
        }
        var show = function(content){
            $('#toast-loading .text').html(content);
            $('#toast-mask,#toast-loading').removeClass('uhide');
        };

        var options = appcan.extend({
            content: JSON.parse(getDialog()) && (JSON.parse(getDialog())).content
        }, options);

        $('#toast-mask')[0] ? "" : $('body').append('<div id="toast-mask" class="uhide" />');
        $('#toast-loading')[0] ? show(options.content) : $('body').append('<div id="toast-loading" class="custom-toast uhide">\
                <div class="content"><div class="icon">\
                <img src="images/talk_loading.gif" />\
                </div><p class="text"></p></div>\
                </div>'),show(options.content);
    },
    tip: function(options){
        var custom_toast_timer;
        var show = function(content){
            $('#toast-tip .text').text(content);
            $('#toast-tip').removeClass('uhide');
            custom_toast_timer && clearTimeout(custom_toast_timer);
            custom_toast_timer = setTimeout(function(){
                $('#toast-tip').addClass('uhide');
                closeDialog()
            }, 2000);
        };
        var options = appcan.extend({
            content: JSON.parse(getDialog()) && (JSON.parse(getDialog())).content
        }, options);
        $('#toast-tip')[0] ? show(options.content) : $('body').append('<div id="toast-tip" class="uhide">\
                <p class="text"></p>\
                </div>'),show(options.content);
    }
}