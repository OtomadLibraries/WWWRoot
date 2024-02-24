function readCollJsonModule(string, div) {
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
                const host = innerObject.host;
                const title = innerObject.title;
                const img = innerObject.img;
                const join_url = innerObject.join_url;
                const video_url = innerObject.video_url;
                const progress = innerObject.progress;
                const introduction = innerObject.introduction;
                const tag = innerObject.tag;
                const time = innerObject.time;
                //console.log('Key:', key, uploader, uploader_header, title, img, url, time);
                const htmlContent = `
<br>
<div style="border-radius: 6px; padding: 14px; box-shadow: 0 3px 6px rgb(0 0 0 / 4%), 0 3px 6px rgb(0 0 0 / 6%); border: 1px solid; border-color: rgba(0,0,0,0.05);border-left:15px solid #b3e6ff;overflow:hidden; background: hsl(0deg 0% 100% / 70%);clear: both;">
    <div style="position:relative;z-index:-1;margin:-14px -14px 0 -14px;height: 0; opacity: 60%; user-select: none;">
        <a href="${img}" class="image">
            <img alt="coop" src="${img}" decoding="async" loading="lazy" width="173"
                 height="108" class="blur" data-file-width="173" data-file-height="108">
        </a>
    </div>
    <div style="margin:14px;">
        <p>
            <a href="${img}" class="image">
                <img alt="${img}" src="${img}" decoding="async" loading="lazy" width="173"
                     height="1080" class="pic" data-file-width="173" data-file-height="108">
            </a>
        </p>
    </div>
    <p>
		<span class="adjusttext">
			<b>
				${title}
			</b>
		</span>
    </p>
    <div class="adjustcontent" style="display:flex;">
        <div style="white-space: nowrap;">
            <b>
                主　　催
            </b>
            ：
        </div>
        <div>
            <a target="_blank" rel="nofollow noreferrer noopener" class="external text"
               href="">
                ${host}
            </a>
        </div>
    </div>
    <div class="adjustcontent" style="display:flex;">
        <div style="white-space: nowrap;">
            <b>
                简　　介
            </b>
            ：
        </div>
        <div>
            ${introduction}
        </div>
    </div>
    <div class="adjustcontent" style="display:flex;">
        <div style="white-space: nowrap;">
            <b>
                加入方式
            </b>
            ：
        </div>
        <div>
            <a target="_blank" rel="nofollow noreferrer noopener" class="external text"
               href="${join_url}">
                ${join_url}
            </a>
        </div>
    </div>
    <p>
        <br>
    </p>
    <div style="white-space: nowrap;display:flex;align-items:baseline;">
        <div style="margin-right:10px;font-size:15px;font-weight:600;">
            目前进度
        </div>
        <div style="width:100%;height:10px;background-color: #b3e6ff;border-radius: 6px;margin-bottom:20px;">
            <div style="width:100%;height:10px;background-color: #b3e6ff;border-radius: 6px;">
            </div>
        </div>
        <div style="margin-left:10px;font-size:15px;">
            ${progress}%
        </div>
    </div>
    <div class="adjustcontent" style="display:flex;">
        <div style="white-space: nowrap;">
            <b>
                合作地址
            </b>
            ：
        </div>
        <div>
            <a target="_blank" rel="nofollow noreferrer noopener" class="external free"
               href="${video_url}">
                ${video_url}
            </a>
        </div>
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
