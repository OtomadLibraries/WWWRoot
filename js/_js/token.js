function checkAccessToken() {
    const gtAccessToken = localStorage.getItem('GT_ACCESS_TOKEN');
    if (!gtAccessToken || gtAccessToken === '') {
        return false;
    } else {
        return true;
    }
}


function accountCheck() {
    const accessTokenExists = checkAccessToken();
    const container = document.querySelector('._235a4d');

    if (accessTokenExists) {
        var USERNAME = localStorage.getItem("USERNAME");
        var HEADER_AVATAR = localStorage.getItem("HEADER-AVATAR");

        const loginHTML = `
    <span class="top-bar-header-avatar">
        <span class="top-bar-header-avatar-box">
            <a href="http://github.com/${USERNAME}">
                <img src="${HEADER_AVATAR}" alt="HEADER-AVATAR" style="width: 30px; height: 30px; border-radius: 50%; margin-top: 0px">
            </a>
        </span>
    </span>
    <span class="top-bar-username">
        <span class="top-bar-username-box">
            <a href="http://github.com/${USERNAME}" style="text-decoration: none; text-align: center; transition: background-color 0.3s ease; display: inline-block; margin-right: 0px;">
               @${USERNAME}
            </a>
        </span>
    </span>
    <span class="top-bar-header-avatar">
        <span class="top-bar-header-avatar-box">
            <a href="">
                <div class="button-div">
                    <a href="/manager/upload/index.html" class="button" style="background-color: #00b3ff; border-radius: 20px; padding: 4px 18px; text-decoration: none; color: white; text-align: center; transition: background-color 0.3s ease; display: inline-block; margin-top: 0px; margin-left: 0px; margin-right: 18px;">投稿</a>
                </div>
            </a>
        </span>
    </span>
    <span class="top-bar-user-login-out">
        <span class="top-bar-login-out">
            <a href="/_2html/loginout.html">
                注销
            </a>
        </span>
    </span>
`;

        container.innerHTML = loginHTML;
    } else {
        const loginHTML = `
            <span class="top-bar-user-login">
                <span class="top-bar-sign-up">
                    <a href="https://github.com/signup">
                        注册
                    </a>
                </span>
                <span class="_7677a3">
                    |
                </span>
                <span class="top-bar-sign-in">
                    <a href="/_2html/login.html">
                        登录
                    </a>
                </span>
            </span>
        `;
        container.innerHTML = loginHTML;
    }
}

