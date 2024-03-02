function changeContent() {
    var nUrl = window.location.pathname;
    var url = '/404.html';
    var radioButtons = document.getElementsByName('option'); // 获取所有单选按钮
    var selectedOption;
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedOption = radioButtons[i].value; // 获取被选中的选项的值
            break;
        }
    }
    if (selectedOption === 'index') {
        url = '/mobile/index.html';
        document.title = "OtoMAD Libraries - 主页";
        pageJump(url,nUrl)
    } else if (selectedOption === 'video') {
        url = '/mobile/video.html';
        document.title = "OtoMAD Libraries - 视频";
        pageJump(url,nUrl)
    } else if (selectedOption === 'comment') {
        url = '/mobile/comment.html';
        document.title = "OtoMAD Libraries - 视频";
        pageJump(url,nUrl)
    } else if (selectedOption === 'collaboration') {
        url = '/mobile/collaboration.html';
        document.title = "OtoMAD Libraries - 合作推广";
        pageJump(url,nUrl)
    } else if (selectedOption === 'read') {
        url = '/mobile/read.html';
        document.title = "OtoMAD Libraries - 专栏";
        pageJump(url,nUrl)
    } else if (selectedOption === 'resource') {
        url = '/mobile/resource.html';
        pageJump(url,nUrl)
    } else if (selectedOption === 'about') {
        url = '/mobile/about.html';
        document.title = "OtoMAD Libraries - 关于";
        pageJump(url,nUrl)
    }

    console.log(selectedOption)
}
function replaceContent(url) {
    var mobileContent = document.getElementById('mobile_content');
    var newContent = document.createElement('div');
    fetch(url)
        .then(response => response.text())
        .then(data => {
            newContent.innerHTML = data;
            mobileContent.appendChild(newContent);
        });
}
function pageJump(url,nUrl) {
    window.location.href = url;
}