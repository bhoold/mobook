
appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.personal,function(msg){
        eval(msg)
    });

    var someone = getSomeone(),
        userinfo = getUserinfo();

    someone = JSON.parse(someone);
    userinfo = JSON.parse(userinfo);

    if (someone && someone.uid != userinfo.uid) {
        userinfo = someone;
        $("#list a.mybook span").text("Ta的图书");
        $("#call").removeClass("uhide");
        $("#list a.logout").addClass("uhide");
    }else{
        $("#list a.mybook span").text("我的图书");
        $("#call").addClass("uhide");
        $("#list a.logout").removeClass("uhide");
    }

    if(!userinfo.bgpic){
        $("#slider .swipe-wrap").append('<figure></figure>');
    }else{
        var bgpic = userinfo.bgpic.split(',');
        for(var i = 0; i < bgpic.length; i++){
        $("#slider .swipe-wrap").append('<figure style="background-image: url(\'' + SERVER.base + bgpic[i] + '\')"></figure>');
        }
    }

    if(userinfo.post){
        $("#text p").text(userinfo.post).removeClass("uhide");
    }else{
        $("#text p").text("").addClass("uhide");
    }

    $("#text h1").text(userinfo.realname);
    $("#list a i.badge").text(userinfo.bookCount);


    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    appcan.button("#list a.mybook", "", function(){
        if($('#list a i.badge').text() > 0){
            gotoPage('book-my');
        }
    });

    appcan.button("#list a.logout", "", function(){
        custom_dialog.confirm({
            content: "<div style='text-align:center;line-height:2em;'>您要退出登录吗?</div>",
            ok: function(){
                setUserinfo('');
                sendMsg(0, 'root', 'init2()');
                gotoPage('login', 5);
                sendMsg(0,'index',"setTimeout(function(){closePage();},2000)");
                setTimeout(function(){closePage();},2000)
            }
        });
    });

    appcan.button("#call", "", function(){
        custom_dialog.confirm({
            content: "<div style='text-align:center;line-height:2em;'>" + userinfo.mobile + "</div>",
            ok: "uexCall.call(" + userinfo.mobile + ");", 
            title: userinfo.realname, 
            okText: "呼叫"
        });
    });


    mySwipe = Swipe(document.getElementById('slider'), {
      startSlide: 0,
      auto: 3000,
      continuous: true,
      disableScroll: false,
      stopPropagation: true,
      callback: function(index, element) {},
      transitionEnd: function(index, element) {}
    });






    
})