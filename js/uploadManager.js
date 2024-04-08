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
function saveInfo(clazzKey) {
    let clazzCard = cardMap.get(clazzKey);

    let type = document.querySelector(".typeValue").vanilla;
    let cid = document.querySelector(".cidValue").value;
    let title = document.querySelector(".titleValue").value;
    let img = document.querySelector(".imgValue").value;
    let ctx = document.querySelector(".ctxValue").value;
    let description = document.querySelector(".descriptionValue").value;
    let tag = document.querySelector(".tagValue").value;

    let params = new URLSearchParams();
    params.append('type', type);
    params.append('cid', cid);
    params.append('title', title);
    params.append('img', img);
    params.append('src', ctx);
    params.append('description', description);
    params.append('tag', tag);
    params.append('token', localStorage.getItem("token"));
    let encodedParams = params.toString();
    let apiUrl = `https://api.otomads.top/user/uploadModify.php?`;

    fetch(apiUrl+encodedParams)
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
function removeInfo(clazzKey) {
    let clazzCard = cardMap.get(clazzKey);

    let result = confirm("确定要执行操作吗？");

    if (result) {
        let type = document.querySelector(".typeValue").vanilla;
        let cid = document.querySelector(".cidValue").value;

        let params = new URLSearchParams();
        params.append('type', type);
        params.append('cid', cid);
        params.append('token', localStorage.getItem("token"));
        let encodedParams = params.toString();
        let apiUrl = `https://api.otomads.top/user/uploadRemove.php?`;

        fetch(apiUrl+encodedParams)
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
                <div class="InputboxFather titleBox">
                    <p><big class="text">用户名/UID</big></p>
                    <p><input type="text" class="Inputbox usernameValue" placeholder="点击输入" disabled></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">类型</big></p>
                    <p><input type="text" class="Inputbox typeValue" vanilla="" placeholder="点击输入" disabled></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">CID</big></p>
                    <p><input type="text" class="Inputbox cidValue" placeholder="点击输入" disabled></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">稿件标题</big></p>
                    <p><input type="text" class="Inputbox titleValue" placeholder="点击输入"></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">封面链接</big></p>
                    <p><input type="text" class="Inputbox imgValue" placeholder="点击输入"></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">内容链接/视频源</big></p>
                    <p><input type="text" class="Inputbox ctxValue" placeholder="点击输入"></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">简介/正文</big></p>
                    <textarea class="Inputbox descriptionValue" placeholder="点击输入" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; width: 100%; height: 200px; resize: none; box-sizing: border-box;"></textarea>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">时间</big></p>
                    <p><input type="text" class="Inputbox timeValue" placeholder="点击输入" disabled></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">标签</big></p>
                    <p><input type="text" class="Inputbox tagValue" placeholder="点击输入"></p>
                </div>
                <div class="InputboxFather titleBox">
                    <p><big class="text">链接</big></p>
                    <p><input type="text" class="Inputbox linkValue" placeholder="点击输入" disabled></p>
                </div>
                <button onclick="saveInfo('${clazzKey}')" title="save" accesskey="v" class="commonButton">保存</button>
                <button onclick="removeInfo('${clazzKey}')" title="remove" accesskey="v" class="commonButton" style="background: red">删除稿件</button>
                `;
    document.querySelector(".right-column").innerHTML = cardHtml;
    document.querySelector(".usernameValue").value = username + " / UID:" + uid;
    document.querySelector(".typeValue").value = typeString;
    document.querySelector(".typeValue").vanilla = type;
    document.querySelector(".cidValue").value = cid;
    document.querySelector(".titleValue").value = title;
    document.querySelector(".imgValue").value = img;
    document.querySelector(".ctxValue").value = src;
    document.querySelector(".descriptionValue").value = description;
    document.querySelector(".timeValue").value = time;
    document.querySelector(".tagValue").value = tag;
    document.querySelector(".linkValue").value = link;
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