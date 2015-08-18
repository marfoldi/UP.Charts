var chartData = generateChartData();
var chart = AmCharts
		.makeChart(
				"chartdiv",
				{
					"type" : "serial",
					"theme" : "patterns",
					"marginRight" : 80,
					"autoMarginOffset" : 20,
					"marginTop" : 7,
					"dataProvider" : chartData.move,
					"valueAxes" : [ {
						"axisAlpha" : 0.2,
						"dashLength" : 1,
						"position" : "left"
					} ],
					"mouseWheelZoomEnabled" : true,
					"graphs" : [ {
						"id" : "g1",
						"balloonText" : "[[category]]<br/><b><span style='font-size:14px;'>value: [[value]]</span></b>",
						"bullet" : "round",
						"bulletBorderAlpha" : 1,
						"bulletColor" : "#FFFFFF",
						"hideBulletsCount" : 50,
						"title" : "red line",
						"valueField" : "visits",
						"useLineColorForBulletBorder" : true
					} ],
					"chartScrollbar" : {
						"autoGridCount" : true,
						"graph" : "g1",
						"scrollbarHeight" : 40
					},
					"chartCursor" : {

					},
					"categoryField" : "date",
					"categoryAxis" : {
						"parseDates" : true,
						"axisColor" : "#DADADA",
						"dashLength" : 1,
						"minorGridEnabled" : true
					},
					"export" : {
						"enabled" : true
					}
				});

chart.addListener("rendered", zoomChart);
zoomChart();

// this method is called when chart is first inited as we listen for
// "dataUpdated" event
function zoomChart() {
	// different zoom methods can be used - zoomToIndexes, zoomToDates,
	// zoomToCategoryValues
	chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}

// generate some random data, quite different range
function generateChartData() {
	var chartData = {
		move: [],
		sleep: []
	};
	var rawData = localStorage.getItem("rawData");
	$.each($.parseJSON(rawData), function(){
		var date;
		var distance;
		var sleep;
		$.each(this, function(key,value){
			if(key === "DATE") {
				date = new Date(value.substring(0,3), value.substring(4,5), value.substring(6,7));
			}
			if(key === "m_distance") {
				distance = (value/1000).toFixed(1);
			}
			if(key === "s_duration") {
				sleep = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, value);
			}
		});
		chartData.move.push({
			date : date.getDate(),
			distance : distance
		});
		chartData.sleep.push({
			date : date.getDate(),
			sleep : sleep
		});
	});
	/*var chartData = [];
	var firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - 5);

	for (var i = 0; i < 1000; i++) {
		// we create date objects here. In your data, you can have date strings
		// and then set format of your dates using chart.dataDateFormat
		// property,
		// however when possible, use date objects, as this will speed up chart
		// rendering.
		var newDate = new Date(firstDate);
		newDate.setDate(newDate.getDate() + i);

		var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;

		chartData.push({
			date : newDate,
			visits : visits
		});
	}*/
	return chartData;
}