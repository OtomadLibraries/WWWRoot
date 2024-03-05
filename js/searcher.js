function search(keyword) {
    addPageContentId('search_text',keyword)
    run('/api/videos.json',keyword)
    run('/api/read.json',keyword)
    run('/api/games.json',keyword)
    run('/api/assets.json',keyword)
    run('/api/software.json',keyword)
    run('/api/project.json',keyword)
}

function addPageContentId(container, content) {
    var containerElement = document.querySelector('.' + container);
    if (containerElement) {
        containerElement.innerHTML += content;
    }
}

async function run(json, keyword) {
    try {
        var result = await getJson(json, keyword); // 等待 getJson 函数的结果
        //console.log(result.keys);
        for (const key of result.keys) {
            var title = await getValueByKey(key, 'title', json);
            var img = await getValueByKey(key, 'img', json);
            var url = await getValueByKey(key, 'url', json);
            var mobile_url = await getValueByKey(key, 'mobile_url', json);
            var time = await getValueByKey(key, 'time', json);
            var uploader = await getValueByKey(key, 'uploader', json);
            var uploader_header = await getValueByKey(key, 'uploader_header', json);
            var tag = await getValueByKey(key, 'tag', json);
            var bl = getAgent();
            var tUrl = url;
            if(bl) {
                tUrl = mobile_url;
                const div_content = `
                <a class="square-box" href="`+tUrl+`">
                    <div class="top-section">
                        <img src="`+img+`" alt="Image" class="image">
                        <h2 class="title">`+title+`</h2>
                    </div>
                    <div class="bottom-section">
                        <div class="uploader-info">
                            <img src="`+uploader_header+`" alt="Uploader Image" class="uploader-image">
                            <span class="uploader-name">`+uploader+`</span>
                        </div>
                    </div>
                </a>`;
                addPageContentId('container', div_content);
            } else {
                tUrl = url;
                const div_content = `
                <div class="media-card">
                    <a href="${url}">
                        <img src="${img}" alt="Cover" class="media-cover" ></a>
                        <div class="media-info">
                            <div class="uploader-info">
                                <a href="https://github.com/${uploader}"><img src="${uploader_header}" alt="Uploader Avatar" class="uploader-avatar"></a>
                                <a href="https://github.com/${uploader}"><p class="uploader-name">${uploader}</p></a>
                            </div>
                            <a href="${url}"><div class="media-title">${title}</div></a>
                            <time>${time}</time>
                        </div>
                    </div>
                `;
                addPageContentId('media-cards-container', div_content);
            }
            //console.log(div_content);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function getAgent() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('android') !== -1 || userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('ipod') !== -1) {
        return true;
    } else {
        return false;
    }
}

function getJson(json, string) {
    return fetch(json)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const result = {
                prefix: data.prefix,
                keys: []
            };

            const listData = data.list;
            listData.forEach(item => {
                const key = Object.keys(item)[0];
                const innerObject = item[key];

                // 检查 innerObject 中是否包含给定字符串
                if (typeof string === 'string' && JSON.stringify(innerObject).toLowerCase().includes(string.toLowerCase())) {
                    result.keys.push(key);
                }
            });

            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            return { prefix: '', keys: [] }; // 返回空对象表示出错
        });
}


function getValueByKey(key0, key1, jsonUrl) {
    return fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const listData = data.list;
            var values = []; // 存储匹配的值的数组
            listData.forEach(item => {
                const key = Object.keys(item)[0];
                if (key === key0) {
                    const innerObject = item[key];
                    const value = innerObject[key1];
                    values.push(value); // 将匹配的值添加到数组中
                }
            });
            return values; // 返回包含匹配值的数组
        })
        .catch(error => {
            console.error('Error:', error);
            return []; // 返回空数组表示出错或未找到任何值
        });
}
