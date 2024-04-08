let cardMap = new Map();
function hideAllUserUploadList() {
    document.querySelector(".assetsContainer").style.display = "none"
    document.querySelector(".gameContainer").style.display = "none"
    document.querySelector(".videoContainer").style.display = "none"
    document.querySelector(".readContainer").style.display = "none"
    document.querySelector(".softwareContainer").style.display = "none"
    document.querySelector(".projectContainer").style.display = "none"
    document.querySelector(".right-column").innerHTML = "";
}
function _thisChange(title) {
    hideAllUserUploadList();
    title = "."+title+"Container";
    document.querySelector(title).style.display = "block"
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function func200(userData) {
    let assetsArray = userData.assets;
    let gameArray = userData.game;
    let videoArray = userData.video;
    let readArray = userData.read;
    let softwareArray = userData.software;
    let projectArray = userData.project;
    arrayForViewer(assetsArray,"assets",".assetsContainer");
    arrayForViewer(gameArray,"game",".gameContainer");
    arrayForViewer(videoArray,"video",".videoContainer");
    arrayForViewer(readArray,"read",".readContainer");
    arrayForViewer(softwareArray,"software",".softwareContainer");
    arrayForViewer(projectArray,"project",".projectContainer");
}
function pass(clazzKey) {
    let clazzCard = cardMap.get(clazzKey);
    let cid = clazzCard.cid;
    let type = clazzCard.type;
    let apiUrl = `https://api.otomads.top/manager/setReview.php?cid=${encodeURIComponent(cid)}&type=${encodeURIComponent(type)}&value=${encodeURIComponent(1)}&token=${encodeURIComponent(localStorage.getItem('token'))}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(json => {
            let code = json.code;
            let message = json.message;
            if(code==200) {
                location.reload();
            }
            window.alert(message)
        })
        .catch(error => {
        console.error('发生错误:', error.message);
    });
}
function fail(clazzKey) {
    let clazzCard = cardMap.get(clazzKey);
    let cid = clazzCard.cid;
    let type = clazzCard.type;
    let apiUrl = `https://api.otomads.top/manager/setReview.php?cid=${encodeURIComponent(cid)}&type=${encodeURIComponent(type)}&value=${encodeURIComponent(-1)}&token=${encodeURIComponent(localStorage.getItem('token'))}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(json => {
            let code = json.code;
            let message = json.message;
            if(code==200) {
                location.reload();
            }
            window.alert(message)
        })
        .catch(error => {
            console.error('发生错误:', error.message);
        });
}
function arrayForViewer(array, type, container) {
    array.forEach(item => {
        let cid = item.cid;
        let title = item.title;
        let uid = item.uploader;
        let src = item.src;
        let description = item.description;
        let img = item.img;
        let time = item.time;
        let tag = item.tag;
        let link = "/404.html";
        if (type == "assets") link = "/resources/assets/index.html?cid=" + cid;
        if (type == "game") link = item.src;
        if (type == "video") link = "/video/index.html?cid=" + cid;
        if (type == "read") link = "/read/index.html?cid=" + cid;
        if (type == "software" || type == "project") link = item.src;

        fetch("https://api.otomads.top/user/queryUser.php?uid=" + encodeURIComponent(uid))
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(json => {
                let code = json.code;
                let jsonp = json.data;
                if (code == 200) {
                    let username = jsonp.username;
                    let useravatar = jsonp.useravatar;
                    let keyHeader = generateRandomString(8)
                    let newCard = new Card(username, uid, useravatar, cid, title, img, src, description, time, tag, type, link);
                    cardMap.set(keyHeader,newCard);
                    let content = `
                        <div class="media-card" onclick="viewerCheck('${keyHeader}',cardMap.get('${keyHeader}'))">
                            <a>
                                <img src="${img}" alt="Cover" class="media-cover" ></a>
                                    <div class="media-info">
                                    <div class="uploader-info">
                                    <a href="/space/index.html?uid=${uid}"><img src="${useravatar}" alt="avatar" class="uploader-avatar"></a>
                                    <a href="/space/index.html?uid=${uid}"><span class="username_up">${username}</span></a>
                                </div>
                                <a><div class="media-title">${title}</div></a>
                                <time>${time}</time>
                            </div>
                        </div>
                        `;
                    document.querySelector(container).innerHTML += content;
                }
            })
            .catch(error => {
                console.error('发生错误:', error.message);
            });
    });
}

function viewerCheck(clazzKey,card) {
    let username = card.username;
    let uid = card.uid;
    let useravatar = card.useravatar;
    let cid = card.cid;
    let title = card.title;
    let img = card.img;
    let src = card.src;
    let description = card.description;
    let time = card.time;
    let tag = card.tag;
    let type = card.type;
    let typeString = null;
    if (type == "assets") typeString = "素材";
    if (type == "game") typeString = "游戏";
    if (type == "video") typeString = "视频";
    if (type == "read") typeString = "专栏";
    if (type == "software") typeString = "软件";
    if (type == "project") typeString = "工程";

    let link = card.link;
    let cardHtml = `
                <p>用户名：${username}(UID:${uid})</p>
                <p>类型：${typeString}</p>
                <p>CID：${cid}</p>
                <p>标题：${title}</p>
                <p>封面：${img}</p>
                <p>内容：${src}</p>
                <p>简介/正文：${description}</p>
                <p>时间：${time}</p>
                <p>标签：${tag}</p>
                <p>链接：https://www.otomads.top${link}</p>
                <button onclick="pass('${clazzKey}')" title="pass" accesskey="v" class="commonButton">通过</button>
                <button onclick="fail('${clazzKey}')" title="fail" accesskey="v" class="commonButton">打回</button>
                `;
    document.querySelector(".right-column").innerHTML = cardHtml;
}

class Card {
    constructor(username, uid, useravatar, cid, title, img, src, description, time, tag, type, link) {
        this.username = username;
        this.uid = uid;
        this.useravatar = useravatar;
        this.cid = cid;
        this.title = title;
        this.img = img;
        this.src = src;
        this.description = description;
        this.time = time;
        this.tag = tag;
        this.type = type;
        this.link = link;
    }
    get() {
        return this;
    }
}