appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.message_detail, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

})