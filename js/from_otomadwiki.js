String.prototype.AllReplace=function(f,e){
    var reg = new RegExp(f,"g");
    return this.replace(reg,e);
}

function from_otomadwiki(id,page){
    $.ajax({
        type: "get",
        url: 'https://otomad.wiki/api.php',
        data: {
            "action": "parse",
            "format": "json",
            "page": page,
            "prop": "text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings",
            "utf8": 1,
            "ascii": 1,
            "disablelimitreport": 1,
            "disabletoc": 1,
            "disableeditsection": 1,
        },
        dataType: "jsonp",
        success: function (data,status) {
            var mes = data.parse.text["*"];
            var links = data.parse.links;
            var images = data.parse.images;
            // 替换链接。
            if(typeof(links) != "undefined"){
                if(typeof(links) == "object"){
                    for(let y = 0; y < links.length; y++){
                        let item = links[y]["*"].replace(" ","_");
                        let urlItem = encodeURI(item);
                        mes = mes.replace("/"+urlItem,"https://otomad.wiki/"+urlItem);
                    }
                }
                else{
                    var urlItem = encodeURI(links);
                    mes = mes.replace("/"+urlItem,"https://otomad.wiki/"+urlItem);
                }
            }
            if(JSON.stringify(images) != '[]'){
                var src_match = /(?<=(img[^>]*src="))[^"]*/g;
                var all_list = mes.match(src_match);
                for (let m = 0; m < all_list.length; m ++){
                    var src = all_list[m];
                    if(src==""){
                        continue
                    }
                    mes = mes.replace(src,"https://otomad.wiki"+src);
                }
            }
            mes = mes.AllReplace("https://otomad.wikihttps://otomad.wiki","https://otomad.wiki");
            var obj = document.getElementById(id);
            obj.innerHTML = mes;
            bilipic();
            childbox_more();
        },
        error: function(){
            var obj = document.getElementById(id);
            obj.innerHTML = "<div style='display:block;margin:auto;text-align:center;font-size:18px;'>加载 OtomadWiki 内容时发生了错误。</div>"
        }
    });
}

//from_otomadwiki("new_event", "最新事件");
