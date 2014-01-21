document.addEventListener('DOMContentLoaded', function () {
  var objectId = localStorage["objectId"];
  var pnlObjectId = document.getElementById('pnlObjectId');
  pnlObjectId.innerText = objectId ? objectId : '0000000000000000';
  pnlObjectId.style.color = localStorage["isNewFound"] && localStorage["isNewFound"] == 1 ? 'black' : 'lightgray';
});