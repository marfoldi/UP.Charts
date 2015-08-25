var chartData = generateChartData();
var moveChart = AmCharts
		.makeChart(
				"moveChart",
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
						"valueField" : "distance",
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
				
var sleepChart = AmCharts
		.makeChart(
				"sleepChart",
				{
					"type" : "serial",
					"theme" : "patterns",
					"marginRight" : 80,
					"autoMarginOffset" : 20,
					"marginTop" : 7,
					"dataProvider" : chartData.sleep,
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
						"valueField" : "sleep",
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

moveChart.addListener("rendered", zoomChart);
sleepChart.addListener("rendered", zoomChart);
zoomChart();

// this method is called when chart is first inited as we listen for
// "dataUpdated" event
function zoomChart() {
	// different zoom methods can be used - zoomToIndexes, zoomToDates,
	// zoomToCategoryValues
	moveChart.zoomToDates(new Date(2005, 0, 1), new Date(Date.now()));
	sleepChart.zoomToDates(new Date(2005, 0, 1), new Date(Date.now()));
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
				date = new Date( parseInt(value.substring(0,4)), parseInt(value.substring(4,6))-1, parseInt(value.substring(6,8)));
			}
			if(key === "m_distance") {
				distance = isNaN(value)?0:(value/1000).toFixed(1);
			}
			if(key === "s_duration") {
				sleep = isNaN(value)?"0:00":new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, value);
			}
		});
		if(!isNaN(Date.parse(date))) {
			chartData.move.push({
				date : date,
				distance : distance
			});
			chartData.sleep.push({
				date : date,
				sleep : sleep
			});
		}
	});
	return chartData;
}