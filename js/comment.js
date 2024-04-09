async function removeComment(cid,_T_,divThis) {
    let token = localStorage.getItem('token');
    let apiUrl = "https://api.otomads.top/comments/delete.php?token=" + encodeURIComponent(token) + "&cid=" + encodeURIComponent(cid);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(data => {
            let code = data.code;
            let message = data.message;
            if(code==404) {
                alert(message);
            } else if(code==200) {
                alert(message);
                let div = divThis.closest('.gt-comment-admin');
                div.remove();
            }
        })
        .catch(error => {
            try {
            } catch (e) {
            }
        });
}

async function manageCommentButton() {
    let token = localStorage.getItem('token');
    let apiUrl = "https://api.otomads.top/user/queryToken.php?token=" + token;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(data => {
            let code = data.code;
            let message = data.message;
            if(code==404) {
            } else if(code==200) {
                let dataArray = data.data;
                let uid_server = dataArray.uid;
                let dv0 = document.querySelectorAll(".delete_button");
                dv0.forEach(bt => {
                    let onclickValue = bt.getAttribute("onclick");
                    let match = onclickValue.match(/'cm_uid_(\d+)'/);
                    if (match) {
                        let uid = match[1];
                        if(uid==uid_server) {
                            bt.style.display = "block";
                        }
                    } else {
                        console.error("Failed to extract content from onclick attribute.");
                    }
                });
            }
        })
        .catch(error => {
            try {
                alert();
            } catch (e) {
            }
        });
}

async function refreshCommentBox() {
    const targetDiv = document.querySelector(".comment_list");
    if (targetDiv) {
        targetDiv.innerHTML = ``;
        getCommentArray(_pidL);
        manageCommentButton();
    } else {
        console.error('Target element not found:', targetDiv);
    }
}

async function sendComment(pid) {
    let token = localStorage.getItem('token');
    let apiUrl = "https://api.otomads.top/user/queryToken.php?token=" + token;
    let cText = document.querySelector(".gt-header-textarea").value;
    if(cText==="") return;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(data => {
            let code = data.code;
            let message = data.message;
            if(code==404) {
                alert(message);
            } else if(code==200) {
                let dataArray = data.data;
                let isBanned = dataArray.isBanned;
                if(isBanned==0) {
                    let apiSend = "https://api.otomads.top/comments/create.php?token=" + encodeURIComponent(token) + "&pid=" + pid + "&cText=" + encodeURIComponent(cText);
                    fetch(apiSend)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('网络请求失败');
                            }
                            return response.json();
                        })
                        .then(data => {
                            let code = data.code;
                            let message = data.message;
                            alert(message);
                            document.querySelector(".gt-header-textarea").value = "";
                            refreshCommentBox();
                        })
                        .catch(error => {
                            console.error(error)
                        });
                } else {
                    alert("您的账号已被封禁");
                }
            }
        })
        .catch(error => {
            try {
            } catch (e) {
            }
        });
}

async function registerCommentsBox(pid) {
    getCommentToken();
    getCommentArray(pid);
    manageCommentButton()
}
async function getCommentToken() {
    let token = localStorage.getItem('token');
    let apiUrl = "https://api.otomads.top/user/queryToken.php?token=" + token;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(data => {
            let code = data.code;
            let userData = data.data;

            if(code==200) {
                let UID = userData.uid;
                let USERNAME = userData.username;
                let HEADER_AVATAR = userData.useravatar;

                let dv0 = document.querySelector('.gt-avatar.gt-header-avatar');
                let dv1 = document.querySelector('.gt-header-controls');
                let H0 = `<img src="${HEADER_AVATAR}" alt="@${USERNAME}">`;
                let H1 = `<button class="gt-btn gt-btn-public" onclick="sendComment(_pidL)"> <span class="gt-btn-text">评论</span> </button>`;
                dv0.innerHTML = H0;
                dv1.innerHTML += H1;
            } else {
                let dv1 = document.querySelector('.gt-header-controls');
                let dv2 = document.querySelector('.gt-header-textarea');
                let H1 = `<button class="gt-btn gt-btn-public" onclick="window.open('/login.html', '_blank');"> <span class="gt-btn-text">登录</span> </button>`;
                dv1.innerHTML += H1;
                dv2.readOnly = true;
                dv2.placeholder = '您没有权限发表评论';
            }
        })
        .catch(error => {
            try {
                let dv1 = document.querySelector('.gt-header-controls');
                let H1 = `<button class="gt-btn gt-btn-public" href="/login.html"> <span class="gt-btn-text">登录</span> </button>`;
                dv1.innerHTML += H1;
            } catch (e) {
            }
        });

}
function getCommentArray(pid) {
    let apiUrl = "https://api.otomads.top/comments/json.php?pid=" + pid;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let code = data.code
            let dataArray = data.data;
            if (code == 200) {
                dataArray.forEach(dA => {
                    let cid = dA.cid;
                    let cText = dA.cText;
                    let uid = dA.uid;
                    let pid = dA.pid;
                    let time = dA.CreatedAt;
                    let username = dA.username;
                    let useravatar = dA.useravatar;
                    let count = Object.keys(dataArray).length;
                    let dv = document.querySelector('.gt-link.gt-link-counts');
                    dv.innerHTML = count;
                    if(count==0) dv.innerHTML = 0;
                    cText = replaceXXSChars(cText);
                    const htmlContent = `
                        <div class="gt-comment gt-comment-admin" style="transform-origin: center top;">
                    <div class="gt-avatar gt-comment-avatar" href="/space/index.html?uid=${uid}">
                        <img src="${useravatar}" alt="@${username}" href="/space/index.html?uid=${uid}">
                    </div>
                    <div class="gt-comment-content">
                        <div class="gt-comment-header">
                            <div class="gt-comment-block-2"></div>
                            <a class="gt-comment-username" href="/space/index.html?uid=${uid}">${username}</a>
                            <span class="gt-comment-date">发表于 </span>
                            <span class="gt-comment-date-text" style="color: #a1a1a1">${time}</span>
                            <a class="gt-comment-edit" title="Like">
                                <span class="gt-ico gt-ico-heart">
                                    <span class="gt-svg">
                                        <img src="/images/comment/gt-ico-heart.svg"></img>
                                    </span>
                                </span>
                            </a>
                            <!--<a  class="gt-comment-edit" title="Edit" target="_blank" rel="noopener noreferrer">
\t\t\t\t\t\t\t\t<span class="gt-ico gt-ico-edit">
\t\t\t\t\t\t\t\t\t<span class="gt-svg">
\t\t\t\t\t\t\t\t\t\t<img src="/images/comment/gt-ico-edit.svg"></img>
\t\t\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t</span>
                            </a>-->
                        </div>
                        <div class="gt-comment-body markdown-body">
                            <p dir="auto" class="markdown_text">${cText}</p>
                        </div>
                        <button class="delete_button" onclick="removeComment(${cid},'cm_uid_${uid}',this)" style="text-align: right; color: #a1a1a1; font-size: 15px; text-decoration: none; display: none; background: none; border: none; float: right;">点击删除</button>
                    </div>
                </div>`;
                    const targetDiv = document.querySelector(".comment_list");
                    if (targetDiv) {
                        targetDiv.innerHTML += htmlContent;
                    } else {
                        console.error('Target element not found:');
                    }
                })
                const converter = new showdown.Converter();
                const bodies = document.querySelectorAll(".markdown_text");
                bodies.forEach(body => {
                    const markdownText = body.innerText;
                    const htmlContent = converter.makeHtml(markdownText);
                    body.innerHTML = htmlContent;
                });

            } else {
                const dvc = document.querySelector('.gt-link.gt-link-counts');
                if (dvc) {
                    dvc.innerHTML = 0;
                } else {
                    console.error('Target element not found:', div);
                }
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}