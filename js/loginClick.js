function loginClick() {
    var checkInterval = setInterval(function() {
        var imgElement = document.querySelector('.gt-user-name');
        if(imgElement) {
            if (!localStorage.getItem('GT_ACCESS_TOKEN')) {
                var element = document.querySelector('.gt-user-name');
                if (element) {
                    element.click();
                    setTimeout(function() {
                        var element2 = document.querySelector('.gt-action-login');
                        if (element2) {
                            element2.click();
                        }
                    }, 200);
                }
                clearInterval(checkInterval);
            } else {
                setTimeout(function() {
                    window.location.assign("/");
                }, 2000);
            }
        }}, 1000);
}
