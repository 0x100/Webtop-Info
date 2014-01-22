document.addEventListener('DOMContentLoaded', function () {

  var objectId = localStorage["objectId"];
  var url = localStorage["webtopUrl"];
  var callerName = localStorage["callerName"];
  var docType = localStorage["docType"];  
  var isNew = localStorage["isNew"] && localStorage["isNew"] == 1;
  
  var pnlObjectId = $("#pnlObjectId");
  var pnlDetails = $("#pnlDetails");        
  var btnDetails = $("#btnDetails");        
    
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
  
  btnDetails.click(function(){
      if(pnlDetails.is(':hidden')) {
          pnlDetails.slideDown('fast', function() {
              btnDetails.attr("src", 'images/up.png');
          });
      }
      else {
          pnlDetails.slideUp('fast', function() {
              btnDetails.attr("src", 'images/down.png');
          });
      }
  });
         
});

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

