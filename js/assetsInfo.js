function getAssets() {
    fetch('./info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const types = data.types;
            const uploader = data.uploader;
            const uploaderHeader = data.uploader_header;
            const info = data.info;
            //console.log('Types:', types);
            //console.log('Uploader:', uploader);
            //console.log('Uploader Header:', uploaderHeader);
            const div_avatar = '<img src="'+uploaderHeader+'" alt="Avatar" href="https://github.com/'+uploader+'" style="border-radius: 50%; width: 30px; height: 30px;">';
            const div_upload = '<a href="https://github.com/'+uploader+'">'+uploader+'</a>';
            inject('.uploader-avatar',div_avatar);
            inject('.uploader-name',div_upload);
            // 遍历 info 数组中的每个元素
            info.forEach(item => {
                const title = item.title;
                const url = item.url;
                const description = item.description;
                const htmlContent0 = `
                <div class="item">
                    <h3>`+title+`</h3>
                    <p>`+description+`</p>
                    <button class="open-close-button" onclick="togglePlayer(this)">展开</button>
                    <div class="media-player" style="display: none">
                    <a href="`+url+`">点击下载/预览
                    </a>
                    </div>
                </div>`;
                //console.log('Title:', title);
                //console.log('URL:', url);
                inject('.container',htmlContent0);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function inject(div,htmlContent) {
    const targetDiv = document.querySelector(div); // 使用正确的选择器
    if (targetDiv) {
        targetDiv.innerHTML += htmlContent;
    } else {
        console.error('Target element not found:', div);
    }
}