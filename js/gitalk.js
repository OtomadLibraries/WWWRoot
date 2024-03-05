var gitalk = new Gitalk({
    clientID: '4c2ae1c3c9a84b017189',
    clientSecret: 'be6e91d681be86f5a727fb6b152025ce75fb0a5e',
    repo: 'web-comments',
    owner: 'SAGUMEDREAM',
    admin: ['SAGUMEDREAM'],
    title: 'issue',
    id: location.pathname,      // Ensure uniqueness and length less than 50
    distractionFreeMode: false,  // Facebook-like distraction free mode
    createIssueManually: true
})

gitalk.render('gitalk-container')