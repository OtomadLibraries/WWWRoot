function readJsonModule(string, div) {
    fetch(string)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prefix = data.prefix;
            //console.log('Prefix:', prefix);
            const listData = data.list;
            listData.forEach(item => {
                const key = Object.keys(item)[0]; // 获取元素的键
                const innerObject = item[key]; // 获取元素的内部对象
                const uploader = innerObject.uploader;
                const uploader_header = innerObject.uploader_header;
                const title = innerObject.title;
                const img = innerObject.img;
                const url = innerObject.url;
                const time = innerObject.time;
                //console.log('Key:', key, uploader, uploader_header, title, img, url, time);
                const htmlContent = `
            <div class="card">
                <a class="jss27 _9af0d7  clickable-link" tabindex="0" role="button" title=${uploader} href=${url}>
                    <div>
                        <img alt="Game Preview" src=${img}>
                            <div class="_6d6ce4">
                            ${title}
                            </div>
                    </div>
                   <span class="jss39"></span>
            </a>
            <div class="_10eb02">
                <a href=https://github.com/${uploader}>
                    <img alt="Avatar" class="_1ff49e undefined undefined" src=${uploader_header}>
                    <span class="_5266b3">
            @${uploader}</span>
                </a>
                <time>
                    ${time}
                </time>
            </div>
            </div>
                `;
                const targetDiv = document.getElementById(div);
                targetDiv.innerHTML += htmlContent;
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}
