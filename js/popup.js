document.addEventListener('DOMContentLoaded', function () { 
    initialize();
});

function initialize() {   
    initializeButtons();
    render();     
}

function render() {
    var content = $("#content");
    content.css('padding-right', localStorage["objectId"] ? '40px' : '10px');

    updateText();
    setButtonsVisibility(); 
}

function initializeButtons() {
    
    var btnClear = $("#btnClear");
    var btnDetails = $("#btnDetails");       
    
    btnClear.click(function(){
        onClear();
    });                
    btnDetails.click(function(){
        onDetailsClick();
    });
}

function setButtonsVisibility() {

    var btnClear = $("#btnClear");
    var btnDetails = $("#btnDetails");       
    
    if(localStorage["objectId"]) {
        btnClear.css('display', 'block');    
        btnDetails.css('display', 'block');  
    } else {
        btnClear.css('display', 'none');  
        btnDetails.css('display', 'none');  
    }
}

function updateText() {

    var objectId = localStorage["objectId"];
    var url = localStorage["webtopUrl"];
    var callerName = localStorage["callerName"];
    var docType = localStorage["docType"];  
    var isNew = localStorage["isNew"] && localStorage["isNew"] == 1;
    
    var pnlObjectId = $("#pnlObjectId");
    var pnlDetails = $("#pnlDetails");  
  
    var textColor = isNew ? 'black' : 'gray'; 
    var vStyle = 'style="color: ' + (isNew ? 'gray' : 'lightgray') + ';"';  
    var detail = '{0}: <span ' + vStyle + '>{1}</span></br>';
      
    var details = (callerName ? detail.format(['{0}', '{1}']) : '')
                + (docType    ? detail.format(['{2}', '{3}']) : '')
                + (url        ? detail.format(['{4}', '{5}']) : '');
                           
    details = details.format(['Caller component', callerName, 
                              'Type',             docType, 
                              'URL',              url,
                             ])                                 
    pnlDetails.css('color', textColor);  
    pnlDetails.html(details);
    
    pnlObjectId.css('color', textColor);  
    pnlObjectId.text(objectId ? objectId : '0000000000000000');           
}

function onClear() {    
    var pnlDetails = $("#pnlDetails"); 
    
    localStorage.removeItem("objectId");
    localStorage.removeItem("webtopUrl");
    localStorage.removeItem("callerName");
    localStorage.removeItem("docType"); 
    localStorage.removeItem("isNew");  
    
    if(!pnlDetails.is(':hidden')) {
        hideDetails();
    } else {   
        render();
    }        
    chrome.browserAction.setBadgeText({text: ''});
}

function onDetailsClick() {
    var pnlDetails = $("#pnlDetails"); 
    
    if(pnlDetails.is(':hidden')) {
        showDetails();
    }
    else {
        hideDetails();
    }
}

function showDetails() {
    var pnlDetails = $("#pnlDetails");
    var btnDetails = $("#btnDetails");     
    pnlDetails.slideDown('fast', function() {
        btnDetails.attr("src", 'images/up.png');
        render();
    });
}

function hideDetails() {
    var pnlDetails = $("#pnlDetails");
    var btnDetails = $("#btnDetails");
    pnlDetails.slideUp('fast', function() {
        btnDetails.attr("src", 'images/down.png');
        render();
    });
}

String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

