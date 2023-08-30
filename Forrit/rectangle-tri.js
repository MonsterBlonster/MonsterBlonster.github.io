{"payload":{"allShortcutsEnabled":true,"fileTree":{"Angel":{"items":[{"name":"Common","path":"Angel/Common","contentType":"directory"},{"name":"T-shape-fan.html","path":"Angel/T-shape-fan.html","contentType":"file"},{"name":"T-shape-fan.js","path":"Angel/T-shape-fan.js","contentType":"file"},{"name":"circlefan.html","path":"Angel/circlefan.html","contentType":"file"},{"name":"circlefan.js","path":"Angel/circlefan.js","contentType":"file"},{"name":"gasket1-lit.html","path":"Angel/gasket1-lit.html","contentType":"file"},{"name":"gasket1-lit.js","path":"Angel/gasket1-lit.js","contentType":"file"},{"name":"hhpyramid.html","path":"Angel/hhpyramid.html","contentType":"file"},{"name":"hhpyramid.js","path":"Angel/hhpyramid.js","contentType":"file"},{"name":"pointtest.html","path":"Angel/pointtest.html","contentType":"file"},{"name":"pointtest.js","path":"Angel/pointtest.js","contentType":"file"},{"name":"rectangle-tri.html","path":"Angel/rectangle-tri.html","contentType":"file"},{"name":"rectangle-tri.js","path":"Angel/rectangle-tri.js","contentType":"file"},{"name":"triangle.html","path":"Angel/triangle.html","contentType":"file"},{"name":"triangle.js","path":"Angel/triangle.js","contentType":"file"}],"totalCount":15},"":{"items":[{"name":"Angel","path":"Angel","contentType":"directory"},{"name":"Common","path":"Common","contentType":"directory"},{"name":"ThreeJS","path":"ThreeJS","contentType":"directory"},{"name":".gitattributes","path":".gitattributes","contentType":"file"},{"name":"HI_merki.jpg","path":"HI_merki.jpg","contentType":"file"},{"name":"README.md","path":"README.md","contentType":"file"},{"name":"index.html","path":"index.html","contentType":"file"},{"name":"tgr1.ico","path":"tgr1.ico","contentType":"file"}],"totalCount":8}},"fileTreeProcessingTime":6.101051,"foldersToFetch":[],"reducedMotionEnabled":"system","repo":{"id":444601169,"defaultBranch":"main","name":"WebGL-forrit","ownerLogin":"Hjalmtyr","currentUserCanPush":false,"isFork":false,"isEmpty":false,"createdAt":"2022-01-05T00:03:58.000+00:00","ownerAvatar":"https://avatars.githubusercontent.com/u/24594513?v=4","public":true,"private":false,"isOrgOwned":false},"symbolsExpanded":false,"treeExpanded":true,"refInfo":{"name":"main","listCacheKey":"v0:1641341040.311009","canEdit":true,"refType":"branch","currentOid":"349092d061ae1d608a10a0fbe5fbceb57cd0101a"},"path":"Angel/rectangle-tri.js","currentUser":{"id":36676480,"login":"monsterblonster","userEmail":"binni.stefansson@gmail.com"},"blob":{"rawLines":["//////////////////////////////////////////////////////////////////////","//    Sýnidæmi fyrir heimadæmi 1 í Tölvugrafík","//     Rétthyrningur teiknaður með tveimur sjálfstæðum þríhyrningum","//","//    Hjálmtýr Hafsteinsson, ágúst 2023","//////////////////////////////////////////////////////////////////////","var gl;","var points;","","window.onload = function init()","{","    var canvas = document.getElementById( \"gl-canvas\" );","    ","    gl = WebGLUtils.setupWebGL( canvas );","    if ( !gl ) { alert( \"WebGL isn't available\" ); }","","    var vertices = new Float32Array([-0.5, -0.25, 0.5, 0.25, -0.5, 0.25,","\t\t\t\t\t\t\t\t\t -0.5, -0.25, 0.5, -0.25, 0.5, 0.25]);","","    //  Configure WebGL","","    gl.viewport( 0, 0, canvas.width, canvas.height );","    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );","    ","    //  Load shaders and initialize attribute buffers","    ","    var program = initShaders( gl, \"vertex-shader\", \"fragment-shader\" );","    gl.useProgram( program );","    ","    // Load the data into the GPU","    ","    var bufferId = gl.createBuffer();","    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );","    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );","","    // Associate out shader variables with our data buffer","    ","    var vPosition = gl.getAttribLocation( program, \"vPosition\" );","    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );","    gl.enableVertexAttribArray( vPosition );","","    render();","};","","","function render() {","    gl.clear( gl.COLOR_BUFFER_BIT );","    gl.drawArrays( gl.TRIANGLES, 0, 6 );","}"],"stylingDirectives":[[{"start":0,"end":70,"cssClass":"pl-c"}],[{"start":0,"end":46,"cssClass":"pl-c"}],[{"start":0,"end":67,"cssClass":"pl-c"}],[{"start":0,"end":2,"cssClass":"pl-c"}],[{"start":0,"end":39,"cssClass":"pl-c"}],[{"start":0,"end":70,"cssClass":"pl-c"}],[{"start":0,"end":3,"cssClass":"pl-k"},{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":0,"end":3,"cssClass":"pl-k"},{"start":4,"end":10,"cssClass":"pl-s1"},{"start":10,"end":11,"cssClass":"pl-kos"}],[],[{"start":0,"end":6,"cssClass":"pl-smi"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":13,"cssClass":"pl-en"},{"start":14,"end":15,"cssClass":"pl-c1"},{"start":16,"end":24,"cssClass":"pl-k"},{"start":25,"end":29,"cssClass":"pl-en"},{"start":29,"end":30,"cssClass":"pl-kos"},{"start":30,"end":31,"cssClass":"pl-kos"}],[{"start":0,"end":1,"cssClass":"pl-kos"}],[{"start":4,"end":7,"cssClass":"pl-k"},{"start":8,"end":14,"cssClass":"pl-s1"},{"start":15,"end":16,"cssClass":"pl-c1"},{"start":17,"end":25,"cssClass":"pl-smi"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":40,"cssClass":"pl-en"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":53,"cssClass":"pl-s"},{"start":54,"end":55,"cssClass":"pl-kos"},{"start":55,"end":56,"cssClass":"pl-kos"}],[],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":7,"end":8,"cssClass":"pl-c1"},{"start":9,"end":19,"cssClass":"pl-v"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":20,"end":30,"cssClass":"pl-en"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":32,"end":38,"cssClass":"pl-s1"},{"start":39,"end":40,"cssClass":"pl-kos"},{"start":40,"end":41,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-k"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":9,"end":10,"cssClass":"pl-c1"},{"start":10,"end":12,"cssClass":"pl-s1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":15,"end":16,"cssClass":"pl-kos"},{"start":17,"end":22,"cssClass":"pl-en"},{"start":22,"end":23,"cssClass":"pl-kos"},{"start":24,"end":47,"cssClass":"pl-s"},{"start":48,"end":49,"cssClass":"pl-kos"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":51,"end":52,"cssClass":"pl-kos"}],[],[{"start":4,"end":7,"cssClass":"pl-k"},{"start":8,"end":16,"cssClass":"pl-s1"},{"start":17,"end":18,"cssClass":"pl-c1"},{"start":19,"end":22,"cssClass":"pl-k"},{"start":23,"end":35,"cssClass":"pl-v"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":37,"cssClass":"pl-kos"},{"start":37,"end":38,"cssClass":"pl-c1"},{"start":38,"end":41,"cssClass":"pl-c1"},{"start":41,"end":42,"cssClass":"pl-kos"},{"start":43,"end":44,"cssClass":"pl-c1"},{"start":44,"end":48,"cssClass":"pl-c1"},{"start":48,"end":49,"cssClass":"pl-kos"},{"start":50,"end":53,"cssClass":"pl-c1"},{"start":53,"end":54,"cssClass":"pl-kos"},{"start":55,"end":59,"cssClass":"pl-c1"},{"start":59,"end":60,"cssClass":"pl-kos"},{"start":61,"end":62,"cssClass":"pl-c1"},{"start":62,"end":65,"cssClass":"pl-c1"},{"start":65,"end":66,"cssClass":"pl-kos"},{"start":67,"end":71,"cssClass":"pl-c1"},{"start":71,"end":72,"cssClass":"pl-kos"}],[{"start":10,"end":11,"cssClass":"pl-c1"},{"start":11,"end":14,"cssClass":"pl-c1"},{"start":14,"end":15,"cssClass":"pl-kos"},{"start":16,"end":17,"cssClass":"pl-c1"},{"start":17,"end":21,"cssClass":"pl-c1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":23,"end":26,"cssClass":"pl-c1"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":28,"end":29,"cssClass":"pl-c1"},{"start":29,"end":33,"cssClass":"pl-c1"},{"start":33,"end":34,"cssClass":"pl-kos"},{"start":35,"end":38,"cssClass":"pl-c1"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":40,"end":44,"cssClass":"pl-c1"},{"start":44,"end":45,"cssClass":"pl-kos"},{"start":45,"end":46,"cssClass":"pl-kos"},{"start":46,"end":47,"cssClass":"pl-kos"}],[],[{"start":4,"end":23,"cssClass":"pl-c"}],[],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":15,"cssClass":"pl-en"},{"start":15,"end":16,"cssClass":"pl-kos"},{"start":17,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":20,"end":21,"cssClass":"pl-c1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":23,"end":29,"cssClass":"pl-s1"},{"start":29,"end":30,"cssClass":"pl-kos"},{"start":30,"end":35,"cssClass":"pl-c1"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":37,"end":43,"cssClass":"pl-s1"},{"start":43,"end":44,"cssClass":"pl-kos"},{"start":44,"end":50,"cssClass":"pl-c1"},{"start":51,"end":52,"cssClass":"pl-kos"},{"start":52,"end":53,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":22,"cssClass":"pl-c1"},{"start":22,"end":23,"cssClass":"pl-kos"},{"start":24,"end":27,"cssClass":"pl-c1"},{"start":27,"end":28,"cssClass":"pl-kos"},{"start":29,"end":32,"cssClass":"pl-c1"},{"start":32,"end":33,"cssClass":"pl-kos"},{"start":34,"end":37,"cssClass":"pl-c1"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-kos"}],[],[{"start":4,"end":53,"cssClass":"pl-c"}],[],[{"start":4,"end":7,"cssClass":"pl-k"},{"start":8,"end":15,"cssClass":"pl-s1"},{"start":16,"end":17,"cssClass":"pl-c1"},{"start":18,"end":29,"cssClass":"pl-en"},{"start":29,"end":30,"cssClass":"pl-kos"},{"start":31,"end":33,"cssClass":"pl-s1"},{"start":33,"end":34,"cssClass":"pl-kos"},{"start":35,"end":50,"cssClass":"pl-s"},{"start":50,"end":51,"cssClass":"pl-kos"},{"start":52,"end":69,"cssClass":"pl-s"},{"start":70,"end":71,"cssClass":"pl-kos"},{"start":71,"end":72,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":26,"cssClass":"pl-s1"},{"start":27,"end":28,"cssClass":"pl-kos"},{"start":28,"end":29,"cssClass":"pl-kos"}],[],[{"start":4,"end":33,"cssClass":"pl-c"}],[],[{"start":4,"end":7,"cssClass":"pl-k"},{"start":8,"end":16,"cssClass":"pl-s1"},{"start":17,"end":18,"cssClass":"pl-c1"},{"start":19,"end":21,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":34,"cssClass":"pl-en"},{"start":34,"end":35,"cssClass":"pl-kos"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":37,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":21,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":34,"cssClass":"pl-c1"},{"start":34,"end":35,"cssClass":"pl-kos"},{"start":36,"end":44,"cssClass":"pl-s1"},{"start":45,"end":46,"cssClass":"pl-kos"},{"start":46,"end":47,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":21,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":34,"cssClass":"pl-c1"},{"start":34,"end":35,"cssClass":"pl-kos"},{"start":35,"end":43,"cssClass":"pl-s1"},{"start":43,"end":44,"cssClass":"pl-kos"},{"start":45,"end":47,"cssClass":"pl-s1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":59,"cssClass":"pl-c1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":61,"end":62,"cssClass":"pl-kos"}],[],[{"start":4,"end":58,"cssClass":"pl-c"}],[],[{"start":4,"end":7,"cssClass":"pl-k"},{"start":8,"end":17,"cssClass":"pl-s1"},{"start":18,"end":19,"cssClass":"pl-c1"},{"start":20,"end":22,"cssClass":"pl-s1"},{"start":22,"end":23,"cssClass":"pl-kos"},{"start":23,"end":40,"cssClass":"pl-en"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":49,"cssClass":"pl-s1"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":51,"end":62,"cssClass":"pl-s"},{"start":63,"end":64,"cssClass":"pl-kos"},{"start":64,"end":65,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":26,"cssClass":"pl-en"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":28,"end":37,"cssClass":"pl-s1"},{"start":37,"end":38,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-c1"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":44,"cssClass":"pl-s1"},{"start":44,"end":45,"cssClass":"pl-kos"},{"start":45,"end":50,"cssClass":"pl-c1"},{"start":50,"end":51,"cssClass":"pl-kos"},{"start":52,"end":57,"cssClass":"pl-c1"},{"start":57,"end":58,"cssClass":"pl-kos"},{"start":59,"end":60,"cssClass":"pl-c1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-c1"},{"start":64,"end":65,"cssClass":"pl-kos"},{"start":65,"end":66,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":30,"cssClass":"pl-en"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":32,"end":41,"cssClass":"pl-s1"},{"start":42,"end":43,"cssClass":"pl-kos"},{"start":43,"end":44,"cssClass":"pl-kos"}],[],[{"start":4,"end":10,"cssClass":"pl-en"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":0,"end":1,"cssClass":"pl-kos"},{"start":1,"end":2,"cssClass":"pl-kos"}],[],[],[{"start":0,"end":8,"cssClass":"pl-k"},{"start":9,"end":15,"cssClass":"pl-en"},{"start":15,"end":16,"cssClass":"pl-kos"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":12,"cssClass":"pl-en"},{"start":12,"end":13,"cssClass":"pl-kos"},{"start":14,"end":16,"cssClass":"pl-s1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":17,"end":33,"cssClass":"pl-c1"},{"start":34,"end":35,"cssClass":"pl-kos"},{"start":35,"end":36,"cssClass":"pl-kos"}],[{"start":4,"end":6,"cssClass":"pl-s1"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":21,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":31,"cssClass":"pl-c1"},{"start":31,"end":32,"cssClass":"pl-kos"},{"start":33,"end":34,"cssClass":"pl-c1"},{"start":34,"end":35,"cssClass":"pl-kos"},{"start":36,"end":37,"cssClass":"pl-c1"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-kos"}],[{"start":0,"end":1,"cssClass":"pl-kos"}]],"csv":null,"csvError":null,"dependabotInfo":{"showConfigurationBanner":false,"configFilePath":null,"networkDependabotPath":"/Hjalmtyr/WebGL-forrit/network/updates","dismissConfigurationNoticePath":"/settings/dismiss-notice/dependabot_configuration_notice","configurationNoticeDismissed":false,"repoAlertsPath":"/Hjalmtyr/WebGL-forrit/security/dependabot","repoSecurityAndAnalysisPath":"/Hjalmtyr/WebGL-forrit/settings/security_analysis","repoOwnerIsOrg":false,"currentUserCanAdminRepo":false},"displayName":"rectangle-tri.js","displayUrl":"https://github.com/Hjalmtyr/WebGL-forrit/blob/main/Angel/rectangle-tri.js?raw=true","headerInfo":{"blobSize":"1.46 KB","deleteInfo":{"deleteTooltip":"Fork this repository and delete the file"},"editInfo":{"editTooltip":"Fork this repository and edit the file"},"ghDesktopPath":"x-github-client://openRepo/https://github.com/Hjalmtyr/WebGL-forrit?branch=main&filepath=Angel%2Frectangle-tri.js","gitLfsPath":null,"onBranch":true,"shortPath":"ae6743f","siteNavLoginPath":"/login?return_to=https%3A%2F%2Fgithub.com%2FHjalmtyr%2FWebGL-forrit%2Fblob%2Fmain%2FAngel%2Frectangle-tri.js","isCSV":false,"isRichtext":false,"toc":null,"lineInfo":{"truncatedLoc":"49","truncatedSloc":"35"},"mode":"file"},"image":false,"isCodeownersFile":null,"isPlain":false,"isValidLegacyIssueTemplate":false,"issueTemplateHelpUrl":"https://docs.github.com/articles/about-issue-and-pull-request-templates","issueTemplate":null,"discussionTemplate":null,"language":"JavaScript","languageID":183,"large":false,"loggedIn":true,"newDiscussionPath":"/Hjalmtyr/WebGL-forrit/discussions/new","newIssuePath":"/Hjalmtyr/WebGL-forrit/issues/new","planSupportInfo":{"repoIsFork":null,"repoOwnedByCurrentUser":null,"requestFullPath":"/Hjalmtyr/WebGL-forrit/blob/main/Angel/rectangle-tri.js","showFreeOrgGatedFeatureMessage":null,"showPlanSupportBanner":null,"upgradeDataAttributes":null,"upgradePath":null},"publishBannersInfo":{"dismissActionNoticePath":"/settings/dismiss-notice/publish_action_from_dockerfile","dismissStackNoticePath":"/settings/dismiss-notice/publish_stack_from_file","releasePath":"/Hjalmtyr/WebGL-forrit/releases/new?marketplace=true","showPublishActionBanner":false,"showPublishStackBanner":false},"renderImageOrRaw":false,"richText":null,"renderedFileInfo":null,"shortPath":null,"tabSize":8,"topBannersInfo":{"overridingGlobalFundingFile":false,"globalPreferredFundingPath":null,"repoOwner":"Hjalmtyr","repoName":"WebGL-forrit","showInvalidCitationWarning":false,"citationHelpUrl":"https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-citation-files","showDependabotConfigurationBanner":false,"actionsOnboardingTip":null},"truncated":false,"viewable":true,"workflowRedirectUrl":null,"symbols":{"timedOut":false,"notAnalyzed":false,"symbols":[{"name":"onload","kind":"function","identStart":346,"identEnd":352,"extentStart":339,"extentEnd":1392,"fullyQualifiedName":"onload","identUtf16":{"start":{"lineNumber":9,"utf16Col":7},"end":{"lineNumber":9,"utf16Col":13}},"extentUtf16":{"start":{"lineNumber":9,"utf16Col":0},"end":{"lineNumber":42,"utf16Col":1}}},{"name":"init","kind":"function","identStart":364,"identEnd":368,"extentStart":355,"extentEnd":1392,"fullyQualifiedName":"init","identUtf16":{"start":{"lineNumber":9,"utf16Col":25},"end":{"lineNumber":9,"utf16Col":29}},"extentUtf16":{"start":{"lineNumber":9,"utf16Col":16},"end":{"lineNumber":42,"utf16Col":1}}},{"name":"render","kind":"function","identStart":1405,"identEnd":1411,"extentStart":1396,"extentEnd":1495,"fullyQualifiedName":"render","identUtf16":{"start":{"lineNumber":45,"utf16Col":9},"end":{"lineNumber":45,"utf16Col":15}},"extentUtf16":{"start":{"lineNumber":45,"utf16Col":0},"end":{"lineNumber":48,"utf16Col":1}}}]}},"copilotInfo":{"documentationUrl":"https://docs.github.com/copilot/overview-of-github-copilot/about-github-copilot-for-individuals","notices":{"codeViewPopover":{"dismissed":false,"dismissPath":"/settings/dismiss-notice/code_view_copilot_popover"}},"userAccess":{"accessAllowed":false,"hasSubscriptionEnded":false,"orgHasCFBAccess":false,"userHasCFIAccess":false,"userHasOrgs":false,"userIsOrgAdmin":false,"userIsOrgMember":false,"business":null,"featureRequestInfo":null}},"csrf_tokens":{"/Hjalmtyr/WebGL-forrit/branches":{"post":"bjqTUrrXWSQkphK66ZizPPrIEiXt4Jel-qyGNZS-bMMsc28c6FEx0p845844KonlgVDgw9kettab_BC7b7BTcw"},"/repos/preferences":{"post":"mcC-iaW0n3fb_oFBOmfnXql4MSthL8oUKr9R0ZkAwUSfP1s9cyQCoj6PdXdFKAOzDk9VEP2dd1VvUNiYldUw4A"}}},"title":"WebGL-forrit/Angel/rectangle-tri.js at main · Hjalmtyr/WebGL-forrit"}