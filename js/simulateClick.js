function simulateClick(selector) {
    setTimeout(function() {
        var element = document.querySelector(selector);
        if (element) {
            element.click();
        } else {
            console.error('Element not found:', selector);
        }
    }, 5000);
}
