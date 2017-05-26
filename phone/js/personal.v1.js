
appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.personal,function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        gotoPage('index');
    });

    appcan.button("#book a.giveBack", "", function(){
        gotoPage('book-give-back');
    });

    appcan.button("#book a.lend", "", function(){
        gotoPage('book-lend');
    });

    appcan.button("#book a.mybook", "", function(){
        gotoPage('book-my');
    });

    appcan.button("#other a.message", "", function(){
        gotoPage('message');
    });

    appcan.button("#other a.logout", "", function(){
        setUserinfo('');
        gotoPage('login', 5);
        sendMsg(0,'index',"setTimeout(function(){closePage();},2000)");
        setTimeout(function(){closePage();},2000)
    });

    var userinfo = getUserinfo();
    userinfo = JSON.parse(userinfo);
    $('#avatar img').prop('src', userinfo.avatar);
    $('#avatar span').text(userinfo.realname);









    
})