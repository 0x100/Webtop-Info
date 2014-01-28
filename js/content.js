document.addEventListener('DOMContentLoaded', function () {
    
    var regContainerName = /[A-Za-z\d]+/;
    var form = $('form');
    
    if(form && form.attr('name') && form.attr('name').indexOf('Container') != -1) {
        var result = form.attr('name').match(regContainerName);
        
        if(result && result.length == 1) {            
            containerName = result[0];
            chrome.runtime.sendMessage({method: "saveValue", key: "containerName", value: containerName});
            console.log(containerName);
        }
    }
});