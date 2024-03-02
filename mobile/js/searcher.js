// 搜索模块
const searchIcon = document.querySelector('.search-icon');
searchIcon.addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    const searchUrl = '/mobile/searcher.html?keyword=' + encodeURIComponent(searchInput);
    window.location.href = searchUrl;
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const searchText = searchInput.value;
        const searchUrl = '/mobile/searcher.html?keyword=' + encodeURIComponent(searchText);

        window.location.href = searchUrl;
    }
});
//