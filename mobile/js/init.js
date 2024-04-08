async function topBarButton(div) {
    await resetPage();
    let value = div.value;
    let dis = document.querySelector("."+value)
    if (value == 'index') {
        document.title = "主页";
    } else if (value == 'video') {
        document.title = "视频";
        postMediaListJson("video",".video .media-cards-container");
    } else if (value == 'comment') {
        document.title = "留言板";
        postToFetch("/api/comment_box.html",".comment_box");
        const _pidL = "_forum"+0;
        await registerCommentsBox(_pidL);
        const gitalkContainer = document.querySelector("#gitalk-container");
    } else if (value == 'collaboration') {
        document.title = "合作推广";
    } else if (value == 'read') {
        document.title = "专栏";
        postMediaListJson("read",".read .media-cards-container");
    } else if (value == 'resource') {
        document.title = "资源";
    } else if (value == 'about') {
        document.title = "关于";
    }
    dis.style.display = "block";
}
async function resetPage() {
    let mainBox = document.querySelectorAll(".pageBox");
    mainBox.forEach(box=>{
        box.style.display = "none";
    })
    let mediaBox = document.querySelectorAll(".media-cards-container");
    mediaBox.forEach(box=>{
        box.innerHTML = "";
    })
    let commentBox = document.querySelector(".comment_box");
    commentBox.innerHTML = "";
}