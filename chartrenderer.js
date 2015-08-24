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
	chart.zoomToDates(chartData.length - 40, chartData.length - 1);
}

// generate data
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
				date = new Date( parseInt(value.substring(0,4)), parseInt(value.substring(4,6)), parseInt(value.substring(6,8)));
			}
			if(key === "m_distance") {
				distance = isNaN(value)?0:(value/1000).toFixed(1);
			}
			//if(key === "s_duration") {
				//sleep = isNaN(value)?"0:00":new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, value);
			//}
		});
		chartData.move.push({
			date : date,
			distance : distance
		});
		/*chartData.sleep.push({
			date : date.getDate(),
			sleep : sleep
		});*/
	});
	return chartData;
}