chrome.runtime.onInstalled.addListener(function() {

    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            //pageUrl: {hostEquals: 'www.facebook.com'},
            //pageUrl: {hostEquals: 'developer.chrome.com'},
           //ageUrl: {hostEquals: 'twitter.com'},
           pageUrl: {hostEquals: 'productforums.google.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


