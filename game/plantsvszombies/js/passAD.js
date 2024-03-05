// 检测是否出现了倒计时广告
function checkADTimer() {
    const adTimer = document.getElementById('ADTimer');
    if (adTimer) {
        // 如果倒计时广告存在，则模拟点击
        adTimer.click();
    }
}

// 每隔一段时间检测一次倒计时广告
setInterval(checkADTimer, 1000);