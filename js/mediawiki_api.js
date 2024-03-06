function appendTextTo(id, jsonData, websiteUrl) {
    let obj = document.querySelector(id);
    let value = jsonData.parse.text['*'];

    //console.log(value);

    if (obj) {
        obj.innerHTML += value;

        let divElement = document.querySelector(id);
        if (divElement) {
            let elementsWithSrc = divElement.querySelectorAll('[src]');
            elementsWithSrc.forEach(element => {
                let src = element.getAttribute('src');
                let newSrc = websiteUrl + src;
                element.setAttribute('src', newSrc);
            });

            let childBoxElements = divElement.querySelectorAll('.childbox-box');
            childBoxElements.forEach(childBoxElement => {
                let childWithDataMore = childBoxElement.querySelector('.childbox-image-more');
                if (childWithDataMore) {
                    let value = childWithDataMore.getAttribute('data-more');
                    // 传递一个匿名函数给 addEventListener，当点击事件发生时调用 jump(value) 函数
                    childBoxElement.addEventListener('click', function() {
                        jump(value);
                    });
                }
            });

        }
    }
}

function jump(url) {
    window.location.href = url;
}

function from_mediawiki(id, page, websiteUrl) {
    let apiEndpoint = websiteUrl + "/api.php";
    let params = {
        "action": "parse",
        "format": "json",
        "page": page,
        "prop": "text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings",
        "utf8": 1,
        "ascii": 1,
        "disablelimitreport": 1,
        "disabletoc": 1,
        "disableeditsection": 1,
        "callback": "callback" // 设置回调函数名
    };

    let queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    let fullURL = apiEndpoint + '?' + queryString;

    let scriptTag = document.createElement("script");
    scriptTag.src = fullURL;

    window.callback = function(data) {
        let jsonData = data;
        appendTextTo(id, jsonData, websiteUrl)
    };

    document.body.appendChild(scriptTag);
}
