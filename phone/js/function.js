/**
 * 禁止物理键返回上页
 */
function isWindows() {
    if (!('ontouchstart' in window))
        return true;
}
function random(min,max){
    return parseInt(Math.random()*(max-min+1)+min); 
}
function noBack(){if(isBrowser){}else{
    var plat = uexWidgetOne.getPlatform();
    if(plat) {
        uexWindow.onKeyPressed = function(keyCode){
            if(keyCode == 0)return false;
        }
        uexWindow.setReportKey(0,1);
    }
}}

function ajax(options){
    var options = appcan.extend({
        type: 'get',
        data: {},
        dataType: 'json',
        appVerify: true,
        beforeSend: function(xhr, settings){},
        complete: function(xhr, status){},
        success: function(data, status, requestCode, response, xhr){},
        error: function(xhr, errorType, error,msg){}
    }, options);
    appcan.ajax(options);
}

function sendMsg(){
    if(!arguments[0]){
        appcan.window.evaluateScript({
            name: arguments[1],
            scriptContent:arguments[2]
        });
    }else if(arguments[0] == 1){
        appcan.window.evaluatePopoverScript({
            name: arguments[1],
            popName: arguments[2],  
            scriptContent: arguments[3]
        });
    }else if(arguments[0] == 2){
        appcan.window.publish(arguments[1], arguments[2])
    }
}


function gotoPage(page, aniId){if(isBrowser){}else{
    appcan.window.open({
         name: page,
         dataType: 0,
         aniId: aniId || 2,
         data: page + '.html'
    });
    setTimeout(function(){sendMsg(0, page, "noBack()");},1000);
}}
function closePage(num){if(isBrowser){}else{
    appcan.window.close(num || -1);
}}





function getSysinfo(){if(isBrowser){}else{
    return {
        platformName        : uexWidgetOne.platformName,
        platformVersion     : uexWidgetOne.platformVersion,
        iOS7Style           : uexWidgetOne.iOS7Style,
        isFullScreen        : uexWidgetOne.isFullScreen,
        screenWidth         : window.screen.width,
        screenHeight        : window.screen.height,
        winWidth            : $(window).width(),
        winHeight           : $(window).height(),
        userAgent           : navigator.userAgent
    };
}}

function setStorage(key,value){
    if('string' !== typeof value)value = JSON.stringify(value);
    appcan.locStorage.setVal(key,value);
}
function getStorage(key){
    return appcan.locStorage.getVal(key);
}

function openDialog(pram){
    setDialog(pram);
    appcan.frame.open({
        id : "dialog",
        url : "dialog.html",
        top : 0,
        left : 0,
        index : 999
    });
}
function closeDialog(){
    appcan.frame.close("dialog");
}
function setDialog(text){
    setStorage('dialog', text);
}
function getDialog(){
    return getStorage('dialog');
}







function setScanResult(info){
    setStorage('scanResult', info);
}
function getScanResult(){
    return getStorage('scanResult');
}
function setUploadBookInfo(info){
    setStorage('uploadBookInfo', info);
}
function getUploadBookInfo(){
    return getStorage('uploadBookInfo');
}
function setUploadResult(data){
    setStorage('uploadResult', data)
}
function getUploadResult(){
    return getStorage('uploadBookInfo');
}

function setUserinfo(info){
    setStorage('userinfo', info);
}
function getUserinfo(){
    return getStorage('userinfo');
}
function setSomeone(info){
    setStorage('someone', info);
}
function getSomeone(){
    return getStorage('someone');
}



function setBookcate(value){
    setStorage('bookcate', value);
}
function getBookcate(){
    return getStorage('bookcate');
}

function setBooklist(id,value){
    setStorage('booklist-' + id, value);
}
function getBooklist(id){
    return getStorage('booklist-' + id);
}
function setBooklistGiveBack(data){
    setStorage('book-list-give-back', data);
}
function getBooklistGiveBack(){
    return getStorage('book-list-give-back');
}
function setBooklistLend(data){
    setStorage('book-list-lend', data);
}
function getBooklistLend(){
    return getStorage('book-list-lend');
}
function setBooklistMy(data){
    setStorage('book-list-my', data);
}
function getBooklistMy(){
    return getStorage('book-list-my');
}

function setBookDetailID(id){
    setStorage('book-detail-id', id);
}
function getBookDetailID(){
    return getStorage('book-detail-id');
}
function setBookDetail(data){
    setStorage('book-detail', data);
}
function getBookDetail(){
    return getStorage('book-detail');
}

function setSearchResult(data){
    setStorage('book-search', data);
}
function getSearchResult(){
    return getStorage('book-search');
}

function setAppConfig(data){
    setStorage('appConfig', data);
}
function getAppConfig(){
    return getStorage('appConfig');
}











