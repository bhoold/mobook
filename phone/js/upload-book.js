appcan.ready(function() {
    appcan.window.subscribe(CHANNEL.upload_book, function(msg){
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
        url: 'upload-book-content.html',
        top: height,
        left: 0
    });

})