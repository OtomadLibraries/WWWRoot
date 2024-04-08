function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}


function getUserUpload(uid) {
    let apiUrl = "https://api.otomads.top/user/queryUserUpload.php?uid="+encodeURIComponent(uid);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(json => {
            //console.log(json);
            let code = json.code;
            if(code==200) {
                let data = json.data;
                let assetsArray = data.assets;
                let gameArray = data.game;
                let videoArray = data.video;
                let readArray = data.read;
                let softwareArray = data.software;
                let projectArray = data.project;
                arrayFor(assetsArray,"assets",".assetsContainer");
                arrayFor(gameArray,"game",".gameContainer");
                arrayFor(videoArray,"video",".videoContainer");
                arrayFor(readArray,"read",".readContainer");
                arrayFor(softwareArray,"software",".softwareContainer");
                arrayFor(projectArray,"project",".projectContainer");
            }
        })
        .catch(error => {
            console.error('发生错误:', error.message);
        });
}
function arrayFor(array,type,container) {
    array.forEach(item => {
        let cid = item.cid;
        let title = item.title;
        let uid = item.uploader;
        let img = item.img;
        let time = item.time;
        let link = "/404.html";
        if(type=="assets") link = "/resources/assets/index.html?cid=" + cid;
        if(type=="game") link = item.src;
        if(type=="video") link =  "/video/index.html?cid=" + cid;
        if(type=="read") link =  "/read/index.html?cid=" + cid;
        if(type=="software") link =  item.src;
        if(type=="project") link =  item.src;

        fetch("https://api.otomads.top/user/queryUser.php?uid="+encodeURIComponent(uid))
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(json => {
                let code = json.code;
                let jsonp = json.data;
                if(code==200) {
                    let username = jsonp.username;
                    let useravatar = jsonp.useravatar;
                    let content = `
                <div class="media-card">
                    <a href="${link}">
                        <img src="${img}" alt="Cover" class="media-cover" ></a>
                        <div class="media-info">
                            <div class="uploader-info">
                                <a href="/space/index.html?uid=${uid}"><img src="${useravatar}" alt="avatar" class="uploader-avatar"></a>
                                <a href="/space/index.html?uid=${uid}"><span class="username_up">${username}</span></a>
                            </div>
                            <a href="${link}"><div class="media-title">${title}</div></a>
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



function addPageContentId(container, content) {
    var containerElement = document.querySelector('.' + container);
    if (containerElement) {
        containerElement.innerHTML += content;
    }
}