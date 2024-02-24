function getInfo() {
    var checkInterval = setInterval(function() {
        var imgElement = document.querySelector('.gt-avatar img');
        if (imgElement) {
            var srcValue = imgElement.getAttribute('src');
            localStorage.setItem('HEADER-AVATAR', srcValue);

            var spanElement = document.querySelector('.gt-user-name');
            var username = spanElement.textContent;
            localStorage.setItem('USERNAME', username);

            clearInterval(checkInterval); // 停止检测
        }
    }, 100); // 每秒检测一次
}
