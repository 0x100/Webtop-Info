var callback = function(details) { 
if(details.method == 'POST') {
  var requestBody = details.requestBody;
  if(requestBody) {
    var formData = requestBody.formData;
    if(formData) {
      var args = formData.__dmfHandlerArgs;
      if(args) {
        var found = false;
        for(var i in args) {
          var arg = args[i];
          var regexp = /\w+objectId\=([a-z\d]{16})/g;
          if(arg.match(regexp)) {
            var objectId = arg.replace(regexp, '$1', '').substring(0, 16);            
            console.log('ObjectId: ' + objectId);
            localStorage["objectId"] = objectId;
            found = true;
          }          
        }
        localStorage["isNewFound"] = found ? 1 : 0;
        chrome.browserAction.setBadgeBackgroundColor({color: '#0A0'});
        chrome.browserAction.setBadgeText({text: found ? '+' : ''});
      }
    }
  }
}};

chrome.webRequest.onBeforeRequest.addListener(callback, {urls: ["<all_urls>"]}, ["requestBody"]);