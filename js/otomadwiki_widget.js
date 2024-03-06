function bilipic(){$("div[class=bilibilipic]").each(
    function(){
        let img = $(this).children("img");
        let id = $(this).attr("data-id");
        id = isNaN(id) ? "?bvid=" + id : "?aid=" + id;
        $.ajax({
            type: "get",
            url: 'https://api.bilibili.com/x/web-interface/view'+id+"&jsonp=jsonp",
            dataType: "jsonp",
            success: function (data,status) {
                let pic = data.data.pic;
                img.attr("src",pic.replace("http://", "https://"));
            }
        });
    })};

function childbox_more(){
    $(".childbox-image-more").each(
        function(){
            let more = $(this).attr("data-more");
            $(this).attr("onclick","child_more('"+more+"');");
        })
}

function child_more(more){
    window.open(more);
}