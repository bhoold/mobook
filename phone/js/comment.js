appcan.ready(function() {

    appcan.window.subscribe(CHANNEL.comment, function(msg){
        eval(msg)
    });

    appcan.button("#header .left a.btn", "", function(){
        closePage();
    });

    var titHeight = $('#header').offset().height,
        height = titHeight;
    appcan.window.openPopover({
        name: "content",
        dataType:0,
        url: 'comment-content.html',
        top: height,
        left: 0
    });
})