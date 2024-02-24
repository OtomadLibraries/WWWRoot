function loadModule(filePath, parentSelector) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            // 创建一个临时元素并将 HTML 内容插入其中
            var tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // 获取要插入内容的父级元素
            var parentElement = document.querySelector(parentSelector);
            if (parentElement) {
                // 将临时元素中的子元素逐个插入到父级元素中
                while (tempElement.firstChild) {
                    parentElement.appendChild(tempElement.firstChild);
                }

                // 执行页面中的 JavaScript 代码
                var scripts = parentElement.querySelectorAll('script');
                scripts.forEach(script => {
                    var newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    parentElement.appendChild(newScript);
                });

                // 执行页面中的 CSS 代码
                var styles = parentElement.querySelectorAll('style');
                styles.forEach(style => {
                    var newStyle = document.createElement('style');
                    newStyle.textContent = style.textContent;
                    document.head.appendChild(newStyle);
                });
            } else {
                console.error('Parent element not found.');
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the content:', error);
        });
}

function post(filePath, parentSelector, videoParam) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            // 创建一个临时元素并将 HTML 内容插入其中
            var tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // 获取要插入内容的父级元素
            var parentElement = document.querySelector(parentSelector);
            if (parentElement) {
                // 将临时元素中的子元素逐个插入到父级元素中
                while (tempElement.firstChild) {
                    parentElement.appendChild(tempElement.firstChild);
                }

                // 执行页面中的 JavaScript 代码
                var scripts = parentElement.querySelectorAll('script');
                scripts.forEach(script => {
                    var newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    parentElement.appendChild(newScript);
                });

                // 执行页面中的 CSS 代码
                var styles = parentElement.querySelectorAll('style');
                styles.forEach(style => {
                    var newStyle = document.createElement('style');
                    newStyle.textContent = style.textContent;
                    document.head.appendChild(newStyle);
                });

                // 使用 URL 参数设置视频和海报
                if (videoParam) {
                    var videoElement = parentElement.querySelector('#player');
                    if (videoElement) {
                        var sourceElement = videoElement.querySelector('source');
                        if (sourceElement) {
                            sourceElement.src = videoParam;
                        }
                    }
                }
            } else {
                console.error('Parent element not found.');
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the content:', error);
        });
}

