document.addEventListener('DOMContentLoaded', function() {
    var logoutLink = document.querySelector('.gt-action-logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            localStorage.removeItem('GT_ACCESS_TOKEN');
            localStorage.removeItem('HEADER-AVATAR');
            localStorage.removeItem('USERNAME');
        });
    }
});
