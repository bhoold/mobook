/*php推送
workerman
swoole
 */

var titleHeight,
    contentHeight,
    contentNewHeight,
    contentWidth;

var html = '<div class="ub ub-rev item right">\
            <img class="avatar" src="images/avatar.png" />\
            <div class="ub-f1 content"><div class="uc-a1 wrap">{content}</div></div>\
        </div>';

function textView(){
    var data ={
        emojicons: "res://emojicons/emojicons.xml"
    };
    var jsonStr = JSON.stringify(data)
    uexInputTextFieldView.open(jsonStr);
    //uexInputTextFieldView.setInputFocused();
    uexInputTextFieldView.onCommit = function(data){
        var data = JSON.parse(data);
        var _html = html.replace(/{content}/, data.emojiconsText);
        sendMsg(1, "", "content", "$('#content').append('" + _html + "');$('body').scrollTop( $('body')[0].scrollHeight);");
    }
    uexInputTextFieldView.onKeyBoardShow = function(data) {
        appcan.window.resizePopover({
            name: "content",
            top: titleHeight,
            left: 0,
            width: $('#content').offset().width,
            height: $('#content').offset().height
        });
    }

}

function chatKey(){
    uexImageBrowser.cbPick = cbImagePick;
    uexCamera.cbOpen = cbCameraOpen;
    uexAudio.cbBackgroundRecord = cbBackgroundRecord;

    function cbImagePick(opId, dataType, data){
        var dataArray = data.split(","),
            img, _html;
        for (var i = 0; i < dataArray.length; i++) {
            img = dataArray[i].replace("file:///sdcard/", "/storage/emulated/0/");
            _html = html.replace(/{content}/, '<img class="attachment img" src="' + img + '" />');
            sendMsg(1, "", "content", "$('#content').append('" + _html + "');$('body').scrollTop( $('body')[0].scrollHeight);");
        }
    }
    function cbCameraOpen(opCode, dataType, data){
        var data = data.replace("file:///sdcard/", "/storage/emulated/0/");
        var _html = html.replace(/{content}/, '<img class="attachment img" src="' + data + '" />');
        sendMsg(1, "", "content", "$('#content').append('" + _html + "');$('body').scrollTop( $('body')[0].scrollHeight);");
    }
    function cbBackgroundRecord(opId,dataType,data) {
        var data = data.replace("file:///sdcard/", "/storage/emulated/0/");
        var _html = html.replace(/{content}/, '<audio class="attachment audio" controls="controls"><source src="' + data + '" type="audio/mpeg"></audio>');
        sendMsg(1, "", "content", "$('#content').append('" + _html + "');$('body').scrollTop( $('body')[0].scrollHeight);");
    }

    var data ={
        emojicons: "res://emojicons/emojicons.xml",
        shares: "res://shares/shares.xml"
    };
    var jsonStr = JSON.stringify(data)
    uexChatKeyboard.open(jsonStr);

    uexChatKeyboard.onCommit = function(data){
        var data = JSON.parse(data);
        var _html = html.replace(/{content}/, data.emojiconsText);
        sendMsg(1, "", "content", "$('#content').append('" + _html + "');$('body').scrollTop( $('body')[0].scrollHeight);");
    }
    uexChatKeyboard.onShareMenuItem = function(data){
        if(data == "0"){
            uexImageBrowser.pickMulti(9);
        }else if(data == "1"){
            uexCamera.open();
        }
    }
    uexChatKeyboard.onVoiceAction = function(data){
        var data = JSON.parse(data);
        if(!data.status){
            uexAudio.startBackgroundRecord(2,"");
        }else{
            uexAudio.stopBackgroundRecord();
        }
        
    }
    uexChatKeyboard.getInputBarHeight();
    uexChatKeyboard.cbGetInputBarHeight = function(json) {
        var json = JSON.parse(json);
        $('#footer,#footer textarea').css({'height': json.height});
    }
    uexChatKeyboard.onKeyBoardShow = function(data) {
        var data = JSON.parse(data),
            cHeight;
        if(data.status){
            if(!contentNewHeight){contentNewHeight = $('#content').offset().height}
            cHeight = contentNewHeight;
        }else{
            cHeight = contentHeight;
        }

        appcan.window.resizePopover({
            name: "content",
            top: titleHeight,
            left: 0,
            width: contentWidth,
            height: cHeight
        });
    }
}


appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.chat, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    appcan.button("#footer button", "", function(){
        var content = appcan.trim($('textarea').val());
        if(content.length > 1){
            content = $('#footer .hide-text').text(content).html().replace(/\n/g,"<br/>");
            var _html = html.replace(/{content}/, content);
            sendMsg(1, "", "content", "$('#content').append('" + _html + "');$('body').scrollTop( $('body')[0].scrollHeight);");
            $('textarea').val("")
        }
    });


    titleHeight = $('#header').offset().height;
    contentHeight = $('#content').offset().height;
    contentWidth = $('#content').offset().width;

    //textView();

    appcan.window.openPopover({
        name: "content",
        dataType:0,
        url: 'chat-content.html',
        top: titleHeight,
        left: 0,
        height: contentHeight
    });

})