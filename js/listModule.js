function readJsonModule(string, div) {
    fetch(string)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prefix = data.prefix;
            //console.log('Prefix:', prefix);
            const listData = data.list;
            listData.forEach(item => {
                const key = Object.keys(item)[0]; // 获取元素的键
                const innerObject = item[key]; // 获取元素的内部对象
                const uploader = innerObject.uploader;
                const uploader_header = innerObject.uploader_header;
                const title = innerObject.title;
                const img = innerObject.img;
                const url = innerObject.url;
                const time = innerObject.time;
                //console.log('Key:', key, uploader, uploader_header, title, img, url, time);
                const htmlContent = `
            <div class="card">
                <a class="jss27 _9af0d7  clickable-link" tabindex="0" role="button" title=${uploader} href=${url}>
                    <div>
                        <img alt="PreviewCard" src=${img}>
                            <div class="_6d6ce4">
                            ${title}
                            </div>
                    </div>
                   <span class="jss39"></span>
            </a>
            <div class="_10eb02">
                <a href=https://github.com/${uploader}>
                    <img alt="Avatar" class="_1ff49e undefined undefined" src=${uploader_header}>
                    <span class="_5266b3">
            @${uploader}</span>
                </a>
                <time>
                    ${time}
                </time>
            </div>
            </div>
                `;
                const targetDiv = document.getElementById(div);
                targetDiv.innerHTML += htmlContent;
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}
function readVideoJsonMobileModule(string, div) {
    fetch(string)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prefix = data.prefix;
            const listData = data.list;
            listData.forEach(item => {
                const key = Object.keys(item)[0];
                const innerObject = item[key];
                const uploader = innerObject.uploader;
                const uploader_header = innerObject.uploader_header;
                const title = innerObject.title;
                const img = innerObject.img;
                const url = innerObject.url;
                const mobile_url = innerObject.mobile_url;
                const time = innerObject.time;
                const htmlContent = `
                    <div class="video-card">
                    <a href="${mobile_url}">
                        <img src="${img}" alt="Video Cover" class="video-cover" ></a>
                        <div class="video-info">
                            <div class="uploader-info">
                                <a href="https://github.com/${uploader}"><img src="${uploader_header}" alt="Uploader Avatar" class="uploader-avatar"></a>
                                <a href="https://github.com/${uploader}"><p class="uploader-name">${uploader}</p></a>
                                
                            </div>
                            <a href="${mobile_url}"><h4 class="video-title">${title}</h4></a>
                        </div>
                    </div>
                    
                `;
                const targetDiv = document.querySelector(div); // 使用正确的选择器
                if (targetDiv) {
                    targetDiv.innerHTML += htmlContent;
                } else {
                    console.error('Target element not found:', div);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}
function readReadingJsonMobileModule(string, div) {
    fetch(string)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prefix = data.prefix;
            const listData = data.list;
            listData.forEach(item => {
                const key = Object.keys(item)[0];
                const innerObject = item[key];
                const uploader = innerObject.uploader;
                const uploader_header = innerObject.uploader_header;
                const title = innerObject.title;
                const img = innerObject.img;
                const url = innerObject.url;
                const mobile_url = innerObject.mobile_url;
                const time = innerObject.time;
                const htmlContent = `
                    <div class="read-card">
                    <a href="${mobile_url}">
                        <img src="${img}" alt="Reading Cover" class="read-cover" ></a>
                        <div class="read-info">
                            <div class="uploader-info">
                                <a href="https://github.com/${uploader}"><img src="${uploader_header}" alt="Uploader Avatar" class="uploader-avatar"></a>
                                <a href="https://github.com/${uploader}"><p class="uploader-name">${uploader}</p></a>
                            </div>
                            <a href="${mobile_url}"><h4 class="read-title">${title}</h4></a>
                        </div>
                    </div>
                `;
                const targetDiv = document.querySelector(div); // 使用正确的选择器
                if (targetDiv) {
                    targetDiv.innerHTML += htmlContent;
                } else {
                    console.error('Target element not found:', div);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}
function readCommonJsonMobileModule(string, div) {
    fetch(string)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prefix = data.prefix;
            const listData = data.list;
            listData.forEach(item => {
                const key = Object.keys(item)[0];
                const innerObject = item[key];
                const uploader = innerObject.uploader;
                const uploader_header = innerObject.uploader_header;
                const title = innerObject.title;
                const img = innerObject.img;
                const url = innerObject.url;
                const mobile_url = innerObject.mobile_url;
                const time = innerObject.time;
                const htmlContent = `
                    <div class="card">
                    <a href="${mobile_url}">
                        <img src="${img}" alt="Cover" class="cover" ></a>
                        <div class="card-info">
                            <div class="uploader-info">
                                <a href="https://github.com/${uploader}"><img src="${uploader_header}" alt="Uploader Avatar" class="uploader-avatar"></a>
                                <a href="https://github.com/${uploader}"><p class="uploader-name">${uploader}</p></a>
                                
                            </div>
                            <a href="${mobile_url}"><h4 class="card-title">${title}</h4></a>
                        </div>
                    </div>
                    
                `;
                const targetDiv = document.querySelector(div); // 使用正确的选择器
                if (targetDiv) {
                    targetDiv.innerHTML += htmlContent;
                } else {
                    console.error('Target element not found:', div);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}
