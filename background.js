chrome.runtime.onInstalled.addListener(function() {

    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            // pageUrl: {hostEquals: 'www.facebook.com'},
            pageUrl: {hostEquals: 'developer.chrome.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


var context_id = -1;
chrome.input.ime.onFocus.addListener(function(context) {
    context_id = context.contextID;
  });


chrome.input.ime.onKeyEvent.addListener(
        function(engineID, keyData) {
          if (keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
            chrome.input.ime.commitText({"contextID": context_id,
                                         "text": keyData.key.toUpperCase()});
            return true;
          } else {
            return false;
          }
        });
