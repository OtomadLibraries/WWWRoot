var gitalk = new Gitalk({
    clientID: '4c2ae1c3c9a84b017189',
    clientSecret: 'be6e91d681be86f5a727fb6b152025ce75fb0a5e',
    repo: 'web-comments',
    owner: 'SAGUMEDREAM',
    admin: ['SAGUMEDREAM','OtomadLibraries','807131829'],
    title: 'issue',
    id: location.pathname,
    distractionFreeMode: false,
    createIssueManually: true
});

gitalk.render('gitalk-container');
