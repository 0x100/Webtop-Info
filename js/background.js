var callback = function(details) { 

if(details.method == 'POST') {
  var requestBody = details.requestBody;
  
  if(requestBody) {
    var formData = requestBody.formData;
    
    if(formData) {
      var args = formData.__dmfHandlerArgs;
      
      if(args) {
          var isObjectIdFound = false;   
          
          for(var i in args) {          
              var arg = args[i];
              
              var regObjectId = /objectId\=([a-z\d]{16})/;
              var regCallerName = /[A-Za-z\d]+/;
              var regtype = /type\=(\w+)/;
              
              if(arg.match(regObjectId) && arg.match(regObjectId).length >= 2) {            
                  var objectId = arg.match(regObjectId)[1];  
                            
                  localStorage["objectId"] = objectId;
                  localStorage["webtopUrl"] = details.url;
                  isObjectIdFound = true;
                  
                  console.log('document id: ' + objectId);            
                  console.log('url: ' + details.url);         
                
                  if(arg.match(regCallerName)) {
                      var callerName = arg.match(regCallerName);                            
                      localStorage["callerName"] = callerName;
                      console.log('component: ' + callerName);
                  }                  
                  if(arg.match(regtype) && arg.match(regtype).length >= 2) {            
                      var docType = arg.match(regtype)[1];                                  
                      localStorage["docType"] = docType;
                      console.log('type: ' + docType);
                  }  
              }     
          }
          localStorage["isNew"] = isObjectIdFound ? 1 : 0;
          
          chrome.browserAction.setBadgeBackgroundColor({color: '#0A0'});
          chrome.browserAction.setBadgeText({text: isObjectIdFound ? '+' : ''});
      }
    }
  }
}};

chrome.webRequest.onBeforeRequest.addListener(callback, {urls: ["<all_urls>"]}, ["requestBody"]);