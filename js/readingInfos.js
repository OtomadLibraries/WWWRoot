function getReading() {
    fetch('./reading.json')
        .then(response => response.json())
        .then(data => {
            var vid = data.video.vid;
            var uploader = data.video.uploader;
            var uploaderHeader = data.video.uploader_header;
            var title = data.video.title;
            var img = data.video.img;
            var content = data.video.content;
            var url = data.video.url;
            var time = data.video.time;
            var description = data.video.description;
            var tag = data.video.tag;
            const div_avatar = '<img src="'+uploaderHeader+'" alt="Avatar" href="https://github.com/'+uploader+'" style="border-radius: 50%; width: 30px; height: 30px;">';
            const div_upload = '<a href="https://github.com/'+uploader+'">'+uploader+'</a>';
            setPageId('uploader-name',div_upload)
            setPageId('uploader-avatar',div_avatar)
            setPageId('text-title',title)
            setPageId('web_title',title + ' - OtoMAD Libraries')
            setPageId('time',time)
            setPageId('tag',tag)
            getPageContent('article-content','./text.html')
        })
        .catch(error => console.error('Error:', error));
}
function getPageContent(id,url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            var divContent = data;
            setPageId(id, divContent);
        })
        .catch(error => {
            console.error('Error fetching page content:', error);
        });
}
function setPageId(id,divContent) {
    var uploaderElement = document.getElementById(id);
    if (uploaderElement) {
        uploaderElement.innerHTML += divContent;
    }
}