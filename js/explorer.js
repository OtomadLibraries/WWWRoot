window.onload = function() {
    if(!isCanvasSupported()){
        alert("您的浏览器已经旧得生蛆了！");
    }
};

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}