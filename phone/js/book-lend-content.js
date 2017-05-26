function updateList(page, list){
    var page = page || 1,
        list = list || JSON.parse(getBooklistLend()),
        $html = $($('.list')[0] || $('<div class="list" />')),
        $info;
    $html.data('page', page);
    for(var index in list){
        list[index].thumb = list[index].thumb ? list[index].thumb : "images/book-thumb.jpg";
        $info = $('<a class="ub item" data-id="' + list[index].id + '">\
                    <img class="thumb" src="' + list[index].thumb + '" />\
                    <div class="ub-f1 summary">\
                <p class="title ut-s">' + list[index].title + '</p>\
                <p class="star"></p>\
                <p class="tip ut-s"></p>\
                <div class="action">\
                        <button class="uc-a1 button confirm">确认还书</button>\
                        <button class="urging"><i class="icon-status alarm"></i></button>\
                </div>\
            </div>\
        </a>');
        for(var i = 0; i < 5; i++){
            if(i < list[index].level)
                $info.find('p.star').append('<i class="icon-base star"></i>');
            else
                $info.find('p.star').append('<i class="icon-base star2"></i>');
        }

        $info.find('.action .urging').addClass('current');
        $info.find('.tip').html( list[index].lend_name + '已借阅<em>' + list[index].lendtime + '</em>天');

        $html.append($info);
    }
    $('.list')[0] || $('#container').html($html);
}

appcan.ready(function(){
    updateList();

    $(document).on(isWindows() ? "click" : "tap", "#content .thumb", function() {
        setBookDetailID($(this).closest('.item').data('id'));
        sendMsg(0, "book-detail", "window.location.reload()");
        gotoPage('book-detail', 5);
    })

});