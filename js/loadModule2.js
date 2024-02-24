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

function post(filePath, params, parentSelector) {
    // 创建带参数的URL
    let url = new URL(filePath, window.location.href); // 在调用这个函数的页面的 URL 上创建新的 URL

    // 添加查询参数
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
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

