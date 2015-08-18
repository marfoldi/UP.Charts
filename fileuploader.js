var rawData = null;
$(document).ready(
		function() {

			// The event listener for the file upload
			document.getElementById("csvFileUpload").addEventListener("change",
					upload, false);

			function upload(evt) {
				var file = evt.target.files[0];
				var reader = new FileReader();
				reader.readAsText(file);
				reader.onload = function(event) {
					var csvData = event.target.result;
					rawData = csvJSON(csvData);
					if (rawData) {
						localStorage.setItem("rawData", rawData);
						window.location.replace("./charts.html");
					} else {
						alert("No data to import!");
					}
				};
				reader.onerror = function() {
					alert("Unable to read " + file.fileName);
				};
			}
			;

		});
		
function csvJSON(rawData){
  var lines=rawData.toString().split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}