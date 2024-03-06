const commonInstance = new Common();
commonInstance.setup();

const jsConsole = String("\n" +
    "   ____  __________  __  ______    ____  _____    __    ________  ____  ___    ____  _______________\n" +
    "  / __ \\/_  __/ __ \\/  |/  /   |  / __ \\/ ___/   / /   /  _/ __ )/ __ \\/   |  / __ \\/  _/ ____/ ___/\n" +
    " / / / / / / / / / / /|_/ / /| | / / / /\\__ \\   / /    / // __  / /_/ / /| | / /_/ // // __/  \\__ \\ \n" +
    "/ /_/ / / / / /_/ / /  / / ___ |/ /_/ /___/ /  / /____/ // /_/ / _, _/ ___ |/ _, _// // /___ ___/ / \n" +
    "\\____/ /_/  \\____/_/  /_/_/  |_/_____//____/  /_____/___/_____/_/ |_/_/  |_/_/ |_/___/_____//____/  \n" +
    "                                                                                                    \n" +
    "✧ OtoMADs Libraries ✧\n"+
    "   - Designed by 稀神灵梦")
console.log('%c%s', 'color: #637d9e', jsConsole);
window.addEventListener('beforeunload', function() {
    console.log('%c%s', 'color: #637d9e', 'Bye~');
})

function searchButton() {
    let keyword = document.querySelector('.search-input').value;
    let searchURL = '/searcher.html?keyword=' + encodeURIComponent(keyword);
    window.location.href = searchURL;
}

function Common() {
    function setup() {
        login()
    }
    function login() {
        const accessTokenExists = checkAccessToken();
        const container = document.querySelector('.user-container');
        let loginHTML = ``;
        if (accessTokenExists) {
            let USERNAME = localStorage.getItem("USERNAME");
            let HEADER_AVATAR = localStorage.getItem("HEADER-AVATAR");
            loginHTML = `<span class="top-bar-header-avatar"><span class="top-bar-header-avatar-box"><a href="http://github.com/${USERNAME}"><img src="${HEADER_AVATAR}" alt="HEADER-AVATAR" style="width: 30px; height: 30px; border-radius: 50%; margin-top: 0px"></a></span></span><span class="top-bar-username"><span class="top-bar-username-box"><a href="http://github.com/${USERNAME}" style="text-decoration: none; text-align: center; transition: background-color 0.3s ease; display: inline-block; margin-right: 0px;">@${USERNAME}</a></span></span><span class="top-bar-upload"><div class="button-div"><a href="/manager/upload/index.html" class="button" style="background-color: #00b3ff; border-radius: 20px; padding: 4px 18px; text-decoration: none; color: white; text-align: center; transition: background-color 0.3s ease; display: inline-block; margin-top: 0px; margin-left: 0px; margin-right: 18px;">投稿</a></div></span><span class="top-bar-user-login-out"><span class="top-bar-login-out"><a href="/logout.html">注销</a></span></span>`;
            container.innerHTML = loginHTML;
        } else {
            loginHTML = `<div class="user-container"><a href="#">注册</a> | <a href="/api/account.html">登录</a></div>`;
            container.innerHTML = loginHTML;
        }
    }
    function checkAccessToken() {
        const gtAccessToken = localStorage.getItem('GT_ACCESS_TOKEN');
        if (!gtAccessToken || gtAccessToken === '') {
            return false;
        } else {
            return true;
        }
    }
    Common.prototype.setup = function() {
        setup();
    };
}

function setPageContent(div,newDiv) {
    const uploaderElement = document.querySelector(div);
    if (uploaderElement) {
        uploaderElement.innerHTML = newDiv;
    }
}

function addPageContent(div,newDiv) {
    const uploaderElement = document.querySelector(div);
    if (uploaderElement) {
        uploaderElement.innerHTML += newDiv;
    }
}

function pageOpen(url) {
    window.open(url, '_blank');
}

function pageJump(url) {
    window.location.href = url;
}

function postToFetch(filePath, parentSelector) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            // 创建一个临时元素并将 HTML 内容插入其中
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // 获取要插入内容的父级元素
            const parentElement = document.querySelector(parentSelector);
            if (parentElement) {
                // 将临时元素中的子元素逐个插入到父级元素中
                while (tempElement.firstChild) {
                    parentElement.appendChild(tempElement.firstChild);
                }

                // 执行页面中的 JavaScript 代码
                var scripts = parentElement.querySelectorAll('script');
                scripts.forEach(script => {
                    var newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    parentElement.appendChild(newScript);
                });

                // 执行页面中的 CSS 代码
                /*
                var styles = parentElement.querySelectorAll('style');
                styles.forEach(style => {
                    var newStyle = document.createElement('style');
                    newStyle.textContent = style.textContent;
                    document.head.appendChild(newStyle);
                });
                 */
            } else {
                console.error('Parent element not found.');
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the content:', error);
        });
}

function postVideoJson() {
    fetch('./video.json')
        .then(response => response.json())
        .then(data => {
            var vid = data.video.vid;
            var uploader = data.video.uploader;
            var uploaderHeader = data.video.uploader_header;
            var title = data.video.title;
            var img = data.video.img;
            var src = data.video.content;
            var url = data.video.url;
            var time = data.video.time;
            var description = data.video.description;
            var tag = data.video.tag;
            const div_avatar = '<img src="'+uploaderHeader+'" alt="Avatar" href="https://github.com/'+uploader+'" style="border-radius: 50%; width: 40px; height: 40px;">';
            const div_upload = '<a href="https://github.com/'+uploader+'">'+uploader+'</a>';
            setupVideoPlayer(src,img);
            setPageContent('.web_title',title + ' - OtoMAD Libraries')
            setPageContent('.videopage-title',title)
        })
        .catch(error => console.error('Error:', error));
}

function setupVideoPlayer(src,img) {
    const videoElement = document.querySelector('.video-player');
    videoElement.poster = img;
    videoElement.src = src;
}

function togglePlayer(button) {
    var mediaPlayer = button.nextElementSibling;

    if (mediaPlayer.style.display === 'none') {
        mediaPlayer.style.display = 'block';
    } else {
        mediaPlayer.style.display = 'none';
    }
}

function postAssetsListJson(string, div) {
    fetch('./info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const types = data.types;
            const title = data.title;
            const uploader = data.uploader;
            const uploaderHeader = data.uploader_header;
            const info = data.info;
            //console.log('Types:', types);
            //console.log('Uploader:', uploader);
            //console.log('Uploader Header:', uploaderHeader);
            const div_avatar = '<img src="'+uploaderHeader+'" alt="Avatar" href="https://github.com/'+uploader+'" style="border-radius: 50%; width: 30px; height: 30px;">';
            const div_upload = '<a href="https://github.com/'+uploader+'">'+uploader+'</a>';
            addPageContent('.assets-title',title);
            addPageContent('.uploader-avatar',div_avatar);
            addPageContent('.uploader-name',div_upload);
            info.forEach(item => {
                const title = item.title;
                const url = item.url;
                const description = item.description;
                const htmlContent0 = `
                <div class="item">
                    <h3>`+title+`</h3>
                    <p>`+description+`</p>
                    <button class="open-close-button" onclick="togglePlayer(this)">展开</button>
                    <div class="media-player" style="display: none">
                    <a href="`+url+`">点击下载/预览
                    </a>
                    </div>
                </div>`;
                addPageContent('.media-list-container',htmlContent0);
            });

        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}

function postMediaListJson(string, div) {
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
                const video = innerObject.content;
                const mobile_url = innerObject.mobile_url;
                const time = innerObject.time;
                const htmlContent = `
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

function postCollaborationJson(string, div) {
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
                const host = innerObject.host;
                const title = innerObject.title;
                const img = innerObject.img;
                const join_url = innerObject.join_url;
                const video_url = innerObject.video_url;
                const progress = innerObject.progress;
                const introduction = innerObject.introduction;
                const tag = innerObject.tag;
                const time = innerObject.time;
                //console.log('Key:', key, uploader, uploader_header, title, img, url, time);
                const htmlContent = `
                <div style="width: 85%; align-items: center; margin-left: auto; margin-right: auto; border-radius: 6px; padding: 14px; box-shadow: 0 3px 6px rgb(0 0 0 / 4%), 0 3px 6px rgb(0 0 0 / 6%); border: 1px solid; border-color: rgba(0,0,0,0.05);border-left:15px solid #b3e6ff;overflow:hidden; background: hsl(0deg 0% 100% / 70%);clear: both;"><div style="position:relative;z-index:-1;margin:-14px -14px 0 -14px;height: 0; opacity: 60%; user-select: none;"><a href="${img}"class="image"><img alt="coop"src="${img}"decoding="async"loading="lazy"width="173"height="108"class="blur"data-file-width="173"data-file-height="108"></a></div><div style="margin:14px;"><p><a href="${img}"class="image"><img alt="${img}"src="${img}"decoding="async"loading="lazy"width="173"height="108"class="pic"data-file-width="173"data-file-height="108"></a></p></div><p><span class="adjusttext"><b>${title}</b></span></p><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>主催</b>：</div><div><a target="_blank"rel="nofollow noreferrer noopener"class="external text"href="">${host}</a></div></div><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>简介</b>：</div><div>${introduction}</div></div><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>加入方式</b>：</div><div><a target="_blank"rel="nofollow noreferrer noopener"class="external text"href="${join_url}">${join_url}</a></div></div><p><br></p><div style="white-space: nowrap;display:flex;align-items:baseline;"><div style="margin-right:10px;font-weight:600;">目前进度</div><div style="width:100%;height:10px;background-color: #b3e6ff;border-radius: 6px;margin-bottom:20px;"><div style="width:100%;height:10px;background-color: #b3e6ff;border-radius: 6px;"></div></div><div style="margin-left:10px;font-size:15px;">${progress}%</div></div><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>合作地址</b>：</div><div><a target="_blank"rel="nofollow noreferrer noopener"class="external free"href="${video_url}">${video_url}</a></div></div></div><br>
                `;
                const targetDiv = document.querySelector(div);
                targetDiv.innerHTML += htmlContent;
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}
