function getVideo() {
    fetch('./video.json')
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
            const div_avatar = '<img src="'+uploaderHeader+'" alt="Avatar" href="https://github.com/'+uploader+'" style="border-radius: 50%; width: 40px; height: 40px;">';
            const div_videoplayer = '<source src="'+content+'" type="video/mp4">';
            const div_upload = '<a href="https://github.com/'+uploader+'">'+uploader+'</a>';
            setPageId('username',div_upload)
            setPageId('avatar',div_avatar)
            setPageId('videoplayer',div_videoplayer)
            setPageId('text-title',title)
            setPageId('web_title',title + ' - OtoMAD Libraries')
            setPageId('description',description)
            setPageId('time-tag',time)
            setPageId('video-tag',tag)
        })
        .catch(error => console.error('Error:', error));
}
function setPageId(id,text) {
    var uploaderElement = document.getElementById(id);
    if (uploaderElement) {
        uploaderElement.innerHTML += text;
    }
}