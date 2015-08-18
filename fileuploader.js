var rawData = null;
$(document).ready(
		function() {

			// The event listener for the file upload
			document.getElementById('csvFileUpload').addEventListener('change',
					upload, false);

			function upload(evt) {
				var rawData = null;
				var file = evt.target.files[0];
				var reader = new FileReader();
				reader.readAsText(file);
				reader.onload = function(event) {
					var csvData = event.target.result;
					rawData = $.csv.toArrays(csvData);
					if (rawData) {
						window.location.replace("./charts.html");
					} else {
						alert('No data to import!');
					}
				};
				reader.onerror = function() {
					alert('Unable to read ' + file.fileName);
				};
			}
			;

		});