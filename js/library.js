class Common {
    constructor() {
    }
    init() {
        this.login();
        this.logoLink();
        refreshCaptcha();
    }

    logoLink() {
        if(document.querySelector('.logo')) {
            var logo = document.querySelector('.logo');
            logo.addEventListener('click', function() {
                var targetUrl = '/';
                window.location.href = targetUrl;
            });
        }
    }

    login() {
        if(!document.querySelector('.user-container')) return;

        const accessTokenExists = localStorage.getItem('token');
        const container = document.querySelector('.user-container');
        let loginHTML = ``;

        var token = localStorage.getItem('token'); // 替换为实际的用户 token
        var apiUrl = "https://api.otomads.top/user/queryToken.php?token=" + token;
        if (accessTokenExists) {
            fetch(apiUrl, {
                mode: 'cors'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络请求失败');
                    }
                    return response.json();
                })
                .then(data => {
                    // 解析返回的 JSON 数据
                    var code = data.code;
                    var userData = data.data;

                    // 输出 code 和 data 内的每一项
                    /*
                    console.log("code:", code);
                    console.log("uid:", userData.uid);
                    console.log("username:", userData.username);
                    console.log("useravatar:", userData.useravatar);
                    console.log("password:", userData.password);
                    console.log("email:", userData.email);
                    console.log("token:", userData.token);
                    */

                    var UID = userData.uid;
                    var USERNAME = userData.username;
                    var HEADER_AVATAR = userData.useravatar;
                    var PERMISSIONS = userData.permissions;

                    loginHTML = `
                            <span class="top-bar-header-avatar">
                                <div class="top-bar-header-avatar-box">
                                    <a href="/space/index.html?uid=${UID}">
                                        <img src="${HEADER_AVATAR}" alt="HEADER-AVATAR" class="HEADER-AVATAR-DIV" style="border-radius: 50%; margin-top: 0px">
                                    </a>
                                    <div class="dropdown-menu">
                                        <a href="/space/modifyData.html">个人资料</a>
                                        <a href="/space/uploadList.html">投稿管理</a>
                                    </div>
                                </div>
                            </span>
                            <span class="top-bar-username">
                                <span class="top-bar-username-box">
                                    <a class="username-a" href="/space/index.html?uid=${UID}" style="text-decoration: none; text-align: center; transition: background-color 0.3s ease; display: inline-block; margin-right: 0px;">@${USERNAME}</a></span>
                            </span>
                            <span class="top-bar-upload">
                                <div class="button-div">
                                    <a href="/space/upload.html" class="button" style="border-radius: 20px; text-decoration: none; color: white; text-align: center; transition: background-color 0.3s ease; display: inline-block; margin-top: 0px; margin-left: 0px; margin-right: 0.5rem;">
                                        投稿
                                    </a>
                                </div>
                            </span>
                            <span class="top-bar-user-login-out">
                                <span class="top-bar-login-out">
                                    <a class="button-logout" href="/logout.html">退出</a></span>
                            </span>
                    `;
                    container.innerHTML = loginHTML;
                })
                .catch(error => {
                    try {
                        loginHTML = `<div class="user-container"><a href="/register.html">注册</a> | <a href="/login.html">登录</a></div>`;
                        container.innerHTML = loginHTML;
                    } catch (e) {
                    }
                    //console.error('发生错误:', error.message);
                });
        } else {
            loginHTML = `<div class="user-container"><a href="/register.html">注册</a> | <a href="/login.html">登录</a></div>`;
            container.innerHTML = loginHTML;
        }
    }
}

const commonInstance = new Common();
commonInstance.init();
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

function showImg(urlImg) {//图片处理&图片高度自适应
    let frameid = 'frameimg';  //定义frame的id
    window.img = '<img class="media-cover" id="img" style="width:100%" src=\'' + urlImg + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script>';
    document.write('<iframe class="media-cover" id="' + frameid + '" src="javascript:parent.img;" frameBorder="0" scrolling="no" width="100%"></iframe>'); //输出HTML代码
}

function getImg(div,urlImg) {
    let clazz = `<script type="text/javascript">showImg('${urlImg}');</script>`;
    if(document.querySelector(div)) {
        document.querySelector(div).innerHTML = clazz;
    } else if(document.querySelector("."+div)) {
        document.querySelector("."+div).innerHTML = clazz;
    } else if(document.querySelector("#"+div)) {
        document.querySelector("#"+div).innerHTML = clazz;
    }
}

function refreshCaptcha() {
    if(document.getElementById('captchaImg')) {
        const captchaImg = document.getElementById('captchaImg');

        captchaImg.addEventListener('click', function() {
            this.src = 'https://api.otomads.top/captcha.php?' + new Date().getTime(); // 添加时间戳以防止缓存
        });
    }
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

function stringToBase64(str) {
    try {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    } catch (e) {
        console.error("Could not convert the string to Base64.", e);
        return null;
    }
}

function base64ToString(b64) {
    try {
        return decodeURIComponent(Array.prototype.map.call(atob(b64), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e) {
        console.error("Could not convert Base64 to string.", e);
        return null;
    }
}

function replaceXXSChars(XXS) {
    // 使用正则表达式匹配包含 <script> 或 <noscript> 的内容
    // 使用 g 修饰符来匹配所有出现的情况
    // 使用 i 修饰符进行大小写不敏感匹配
    let regex = /<(script|noscript)[^>]*>[\s\S]*?<\/\1>|&lt;|&gt;/gi;

    // 使用 replace 方法来替换匹配到的内容
    let replacedStr = XXS.replace(regex, function(match) {
        // 如果匹配到的内容是 <script> 或 <noscript> 标签，直接返回不做处理
        if (/(?:<script|<noscript)/i.test(match)) {
            return match;
        } else {
            // 否则，根据实际情况替换 &lt; 和 &gt;
            return match.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
    });

    return replacedStr;
}

async function menuButton() {
    const sideButtonList = document.querySelector(".sideButton-list");
    const leftBar = document.querySelector(".left-bar");
    const ctxBox = document.querySelector(".content");
    const bannerBox = document.querySelector(".top-banner-img");
    if (sideButtonList.style.display === "none") {
        // 如果当前为隐藏状态，则改为显示
        sideButtonList.style.display = "block";
        leftBar.style.backgroundColor = "#d9ebff";
        leftBar.style.boxShadow = "0 0 1em #87a9d8";
        leftBar.style.left = "0rem;";
        ctxBox.style.marginLeft = "5em";
        bannerBox.style.marginLeft = "5em";
    } else {
        // 否则，改为隐藏
        sideButtonList.style.display = "none";
        leftBar.style.backgroundColor = "rgba(255, 255, 255, 0)";
        leftBar.style.boxShadow = "none";
        leftBar.style.left = "-5.5rem;";
        ctxBox.style.marginLeft = "0em";
        bannerBox.style.marginLeft = "0em";
    }
}

async function postToFetch(filePath, parentSelector) {
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

async function postUserSpace() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('uid')) {
        let apiUrl = "https://api.otomads.top/user/queryUser.php?uid=" + encodeURIComponent(urlParams.get("uid"));
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(json => {
                let code = json.code;
                let data = json.data;
                if(code!=200) window.location.href = "/404.html";
                //console.log(data);
                let username = data.username;
                let useravatar = data.useravatar;
                let description = data.description;
                let uid = data.uid;
                setPageContent(".username",username);
                setPageContent(".useravatar",`<img src="${useravatar}" alt="">`);
                setPageContent(".userDescription",`${description}`);
            })
            .catch(error => {
                console.error('发生错误:', error.message);
            });
    }
}

async function postVideoJson() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('cid')) {
        let apiUrl = "https://api.otomads.top/video/json.php?cid=" + urlParams.get("cid");
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(data => {
                let code = data.code;
                if(code!==200) return;
                let userData = data.data;
                let uploader = userData.uploader;

                let apiQueryUserUrl = "https://api.otomads.top/user/queryUser.php?uid=" + encodeURIComponent(uploader);
                fetch(apiQueryUserUrl)
                    .then(response => {
                    if (!response.ok) {
                        throw new Error('网络请求失败');
                    }
                    return response.json();
                })
                    .then(data => {
                        let code = data.code;
                        let userData = data.data;
                        //console.log(userData);
                        if(code==200) {
                            let username = userData.username;
                            let useravatar = userData.useravatar;
                            let uid = userData.uid;
                            const div_avatar = '<img src="'+useravatar+'" alt="Avatar" href="/space/index.html?uid='+uid+'" style="border-radius: 50%; width: 30px; height: 30px;">';
                            const div_upload = '<a href="/space/index.html?uid='+uid+'">'+username+'</a>';
                            addPageContent('.uploader-info',div_avatar);
                            addPageContent('.uploader-info',div_upload);
                        }
                    })
                    .catch(error => {
                        console.error('发生错误:', error.message);
                });

                let title = userData.title;
                let img = userData.img;
                let src = userData.src;
                let url = userData.url;
                let time = userData.time;
                let description = userData.description;
                let tag = userData.tag;

                //setupVideoPlayer(src,img);
                var art = new Artplayer({
                    container: '.artplayer',
                    url: `${src}`,
                    volume: 0.7,
                    lang: 'zh-cn',
                    isLive: false,
                    muted: false,
                    autoplay: false,
                    pip: true,
                    autoSize: true,
                    autoMini: true,
                    screenshot: true,
                    setting: true,
                    loop: false,
                    flip: true,
                    playbackRate: true,
                    aspectRatio: true,
                    fullscreen: true,
                    fullscreenWeb: true,
                    subtitleOffset: true,
                    miniProgressBar: true,
                    mutex: true,
                    backdrop: true,
                    playsInline: true,
                    autoPlayback: true,
                    airplay: true,
                });

                setPageContent('.web_title',title + ' - OtoMAD Libraries');
                setPageContent('.videopage-title',title);
                addPageContent('.time',time);
                addPageContent('.description_text',description);
                addPageContent('.tag_text',tag);

            })
            .catch(error => {
                console.error('发生错误:', error.message);
            });
    } else {
        window.location.href = "/404.html";
    }
}

async function postAssetsJson() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('cid')) {
        let apiUrl = "https://api.otomads.top/assets/json.php?cid=" + urlParams.get("cid");
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(json => {
                let code = json.code;
                if(code!==200) return;
                if(code==200) {
                    let dataL = json.data;
                    let array = json.array;

                    let title = dataL.title;
                    let img = dataL.img;
                    let time = dataL.time;
                    let uid = dataL.uploader;
                    let userApi = "https://api.otomads.top/user/queryUser.php?uid=" + encodeURIComponent(uid);
                    fetch(userApi)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('网络请求失败');
                            }
                            return response.json();
                        })
                        .then(userData => {
                            let username = userData.data.username;
                            let useravatar = userData.data.useravatar;
                            const div_avatar = '<img src="' + useravatar + '" alt="Avatar" style="border-radius: 50%; width: 30px; height: 30px;">';
                            const div_upload = '<a href="/space/index.html?uid=' + uid + '">' + username + '</a>';

                            addPageContent('.title',title);
                            addPageContent('.uploader-avatar',div_avatar);
                            addPageContent('.uploader-name',div_upload);
                        })
                        .catch(error => {
                            console.error('发生错误:', error.message);
                        });
                    array.forEach(item => {
                        //console.log(item)
                        let title = item.title;
                        let url = item.src;
                        let description = item.description;
                        let builder = item.builder;
                        let userItemApi = "https://api.otomads.top/user/queryUser.php?uid=" + encodeURIComponent(builder);
                        fetch(userItemApi)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('网络请求失败');
                                }
                                return response.json();
                            })
                            .then(itemJson => {
                                let iData = itemJson.data;
                                let builderUsername = iData.username;
                                let htmlContent0 = `
                                <div class="item">
                                    <h3>`+title+`</h3>
                                    <p>`+description+`</p>
                                    <button class="open-close-button" onclick="togglePlayer(this)">展开</button>
                                    <div class="media-player" style="display: none">
                                        <div class="mp_box" style="display: flex; justify-content: space-between;">
                                        <a href="${url}" style="text-align: left;">点击下载/预览</a>
                                        <div class="builder" style="text-align: right;">贡献者:${builderUsername}</div>
                                    </div>
                                    </div>
                                </div>`;
                                addPageContent('.media-list-container',htmlContent0);
                            })
                            .catch(error => {
                            console.error('发生错误:', error.message);
                        });
                    });
                }
            })
            .catch(error => {
                console.error('发生错误:', error.message);
            });
    } else {
        window.location.href = "/404.html";
    }
}

async function postReadingJson() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('cid')) {
        let apiUrl = "https://api.otomads.top/read/json.php?cid=" + urlParams.get("cid");
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(data => {
                let code = data.code;
                if(code!==200) return;
                let userData = data.data;
                let uploader = userData.uploader;

                let apiQueryUserUrl = "https://api.otomads.top/user/queryUser.php?uid=" + uploader;
                fetch(apiQueryUserUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('网络请求失败');
                        }
                        return response.json();
                    })
                    .then(data => {
                        let code = data.code;
                        let userData = data.data;
                        let username = userData.username;
                        let useravatar = userData.useravatar;
                        const div_avatar = '<img src="'+useravatar+'" alt="Avatar" href="" style="border-radius: 50%; width: 30px; height: 30px;">';
                        const div_upload = '<a href="">'+username+'</a>';
                        addPageContent('.uploader-info',div_avatar);
                        addPageContent('.uploader-info',div_upload);
                    })
                    .catch(error => {
                        console.error('发生错误:', error.message);
                    });

                let title = userData.title;
                let img = userData.img;
                let src = userData.src;
                let url = userData.url;
                let time = userData.time;
                let description = userData.description;
                let tag = userData.tag;

                setPageContent('.title',title);
                addPageContent('.time',time);
                //addPageContent('.content-text',description);
                let converter = new showdown.Converter();
                let html0 = converter.makeHtml(description);
                document.querySelector('.content-text').innerHTML = html0;
                let div = document.querySelector('.content-text');
                let textNodes = getTextNodes(div);
                textNodes.forEach(function(node) {
                    node.nodeValue = node.nodeValue.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                });
            })
            .catch(error => {
                console.error('发生错误:', error.message);
            });
    } else {
        window.location.href = "/404.html";
    }
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

async function postMediaListJson(type, div) {
    let apiUrl;
    switch (type) {
        case "video": {
            apiUrl = "https://api.otomads.top/video/jsonList.php";
            break;
        }
        case "game": {
            apiUrl = "https://api.otomads.top/game/jsonList.php";
            break;
        }
        case "software": {
            apiUrl = "https://api.otomads.top/software/jsonList.php";
            break;
        }
        case "project": {
            apiUrl = "https://api.otomads.top/project/jsonList.php";
            break;
        }
        case "read": {
            apiUrl = "https://api.otomads.top/read/jsonList.php";
            break;
        }
        case "assets": {
            apiUrl = "https://api.otomads.top/assets/jsonList.php";
            break;
        }
        default:
    }
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.code === 200) {
                data.data.forEach(media => {
                    let cid = media.cid;
                    let uid = media.uploader;
                    let title = media.title;
                    let img = media.img;
                    let url = media.url;
                    let src = media.src;
                    let time = media.time;
                    let description = media.description;
                    let tag = media.tag;

                    let cUrl = "/"+type+"/index.html?cid=" + cid;
                    if(type==="software" || type==="project" || type==="project" || type==="game") cUrl = src;
                    if(type==="assets") cUrl = "/resources/"+type+"/index.html?cid=" + cid;
                    let apiQueryUserUrl = "https://api.otomads.top/user/queryUser.php?uid=" + uid;
                    fetch(apiQueryUserUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('网络请求失败');
                            }
                            return response.json();
                        })
                        .then(data => {
                            let userData2 = data.data;
                            let username = userData2.username;
                            let useravatar = userData2.useravatar;
                            const htmlContent = `
                    <div class="media-card" draggable='false'>
                    <a href="${cUrl}">
                        <img referrer="no-referrer" src="${img}" alt="Cover" class="media-cover">
                        </a>
                        <div class="media-info">
                            <div class="uploader-info">
                                <a href="/space/index.html?uid=${uid}"><img src="${useravatar}" alt="Uploader Avatar" class="uploader-avatar"></a>
                                <a href="/space/index.html?uid=${uid}"><p class="uploader-name">${username}</p></a>
                            </div>
                            <a href="${cUrl}"><div class="media-title">${title}</div></a>
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
                        })
                        .catch(error => {
                            console.error('发生错误:', error.message);
                        });

                    /*
                    console.log('VideoId:', video.VideoId);
                    console.log('Uploader:', video.uploader);
                    console.log('Title:', video.title);
                    console.log('Img:', video.img);
                    console.log('Src:', video.src);
                    console.log('Time:', video.time);
                    console.log('Description:', video.description);
                    console.log('Tag:', video.tag);
                    console.log('---------------------');*/
                });
            } else {
                console.error('Server returned error:', data.code);
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}

function getTextNodes(node) {
    var textNodes = [];
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    var currentNode;

    while (currentNode = walker.nextNode()) {
        textNodes.push(currentNode);
    }

    return textNodes;
}

async function postCollaborationJson(div) {
    let apiUrl = "https://api.otomads.top/collaboration/jsonList.php";
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.code === 200) {
                data.data.forEach(media => {
                    let cid = media.cid;
                    let host = media.host;
                    let title = media.title;
                    let img = media.img;
                    let join_url = media.join_url;
                    let video_url = media.video_url;
                    let progress = media.progress;
                    let introduction = media.introduction;
                    let tag = media.tag;
                    const htmlContent = `
                    <div style="width: 85%; align-items: center; margin-left: auto; margin-right: auto; border-radius: 6px; padding: 14px; box-shadow: 0 3px 6px rgb(0 0 0 / 4%), 0 3px 6px rgb(0 0 0 / 6%); border: 1px solid; border-color: rgba(0,0,0,0.05);border-left:15px solid #b3e6ff;overflow:hidden; background: hsl(0deg 0% 100% / 70%);clear: both;"><div style="position:relative;z-index:-1;margin:-14px -14px 0 -14px;height: 0; opacity: 60%; user-select: none;"><a href="${img}"class="image"><img alt="coop"src="${img}"decoding="async"loading="lazy"width="173"height="108"class="blur"data-file-width="173"data-file-height="108"></a></div><div style="margin:14px;"><p><a href="${img}"class="image"><img alt="${img}"src="${img}"decoding="async"loading="lazy"width="173"height="108"class="pic"data-file-width="173"data-file-height="108"></a></p></div><p><span class="adjusttext"><b>${title}</b></span></p><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>主催</b>：</div><div><a target="_blank"rel="nofollow noreferrer noopener"class="external text">${host}</a></div></div><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>简介</b>：</div><div>${introduction}</div></div><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>加入方式</b>：</div><div><a target="_blank"rel="nofollow noreferrer noopener"class="external text"href="${join_url}">${join_url}</a></div></div><p><br></p><div style="white-space: nowrap;display:flex;align-items:baseline;"><div style="margin-right:10px;font-weight:600;">目前进度</div><div style="width:100%;height:10px;background-color: #b3e6ff;border-radius: 6px;margin-bottom:20px;"><div style="width:100%;height:10px;background-color: #b3e6ff;border-radius: 6px;"></div></div><div style="margin-left:10px;font-size:15px;">${progress}%</div></div><div class="adjustcontent"style="display:flex;"><div style="white-space: nowrap;"><b>合作地址</b>：</div><div><a target="_blank"rel="nofollow noreferrer noopener"class="external free"href="${video_url}">${video_url}</a></div></div></div><br>
                    `;
                    const targetDiv = document.querySelector(div);
                    targetDiv.innerHTML += htmlContent;
                })
            }
        }).catch(error => {
        console.error('There was a problem fetching the JSON file:', error);
    });
}