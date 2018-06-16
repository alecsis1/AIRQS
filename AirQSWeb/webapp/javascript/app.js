google.charts.load('current', {'mapsApiKey': 'AIzaSyCAZYz-n4BQeO8FPa99sayZYr4JIWdb39g', 'packages': ['table', 'map', 'corechart', 'timeline']});
google.charts.setOnLoadCallback(initialize);

var dataTable;
var map;
var chart;
var table;

function initialize() {
  // The URL of the spreadsheet to source data from.
  var query = new google.visualization.Query(
      'https://spreadsheets.google.com/pub?key=pCQbetd-CptF0r8qmCOlZGg');
  //query.send(draw);
  getData();
}

function getData() {
	$.ajax({
        url: "/rest/api/v1/am/all"
    }).then(function(data) {
    	console.log(data);
    	draw(data);
    })
//	data = [{"id":1,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1524864909153,"lat":0,"lng":0},{"id":2,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1524864918392,"lat":0,"lng":0},{"id":3,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1524864923990,"lat":0,"lng":0},{"id":4,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1524864932185,"lat":0,"lng":0},{"id":5,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1524864937786,"lat":0,"lng":0},{"id":6,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1524865592224,"lat":0,"lng":0},{"id":0,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1526072269397,"lat":44.234,"lng":23.235456576},{"id":33,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1526072800228,"lat":44.234,"lng":23.235456576},{"id":34,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1526072809462,"lat":44.234,"lng":23.235456576},{"id":35,"name":"Test01AM","mq7":5.5,"mq3":4.4,"mq135":2.2,"mq2":3.3,"hum":1.1,"temp":7.7,"pressure":6.6,"timestamp":1526075346583,"lat":44.234,"lng":23.235456576}];
//
//	draw(data);
}

function draw(response) {
//  if (response.isError()) {
//    alert('Error in query');
//  }

  //var ticketsData = response.getDataTable();
  dataTable = new google.visualization.DataTable(); // DataTable
  dataTable.addColumn('string', 'Name');
  dataTable.addColumn('number', 'MQ7');
  dataTable.addColumn('number', 'MQ3');
  dataTable.addColumn('number', 'MQ135');
  dataTable.addColumn('number', 'MQ2');
  dataTable.addColumn('number', 'Humidity');
  dataTable.addColumn('number', 'Temperature');
  dataTable.addColumn('number', 'Pressure');
  dataTable.addColumn('datetime', 'Date');
  dataTable.addColumn('number', 'Latitude');
  dataTable.addColumn('number', 'Longitude');
  dataTable.addRows(response.length);
  
  var i;
  for (i = 0; i < response.length; i++) {
	  var obj = response[i];
	  dataTable.setCell(i, 0, obj.name);
	  dataTable.setCell(i, 1, obj.mq7);
	  dataTable.setCell(i, 2, obj.mq3);
	  dataTable.setCell(i, 3, obj.mq135);
	  dataTable.setCell(i, 4, obj.mq2);
	  dataTable.setCell(i, 5, obj.hum);
	  dataTable.setCell(i, 6, obj.temp);
	  dataTable.setCell(i, 7, obj.pressure);
	  dataTable.setCell(i, 8, new Date(obj.timestamp));
	  dataTable.setCell(i, 9, obj.lat);
	  dataTable.setCell(i, 10, obj.lng);
  }
  
  $("body > div.tab > button:nth-child(1)")[0].click();
}

function openTab(evt, tabSelection) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabSelection).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(tabSelection == 'RawData') {
    	// Debug table view
    	if (table == null) {
			table = new google.visualization.Table(document.getElementById('table_div'));
			table.draw(dataTable, {showRowNumber: false, width: '100%', height: '100%'});
    	}
    } else if(tabSelection == 'Charts') {
    	// Demo chart
    	if (chart == null) {
    		var options = {
    		        title: 'GAS Sensors',
    		        isStacked: false,
    		        hAxis: {
    		          title: 'Date',
    		          //format: 'dd-MM HH:mm',
    		          gridlines: {count: 15}
    		          viewWindow: {
    		            max: 30
    		          }
    		        },
    		        vAxis: {
    		          title: 'PPM'
    		        },
    		        'legend': 'bottom'
    		      };
			var chartView = new google.visualization.DataView(dataTable);
			chartView.setColumns([8, 1, 2, 3]);
			chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
			chart.draw(chartView, options);
    	}
    } else if(tabSelection == 'Map') {
    	if (map == null) {
    		var map_table = new google.visualization.Table(document.getElementById('map_table_div'));
    		map_table.draw(dataTable, {showRowNumber: false, width: '100%', height: '100%'});
			
    		var options = {
    				showTooltip: true,
    			    showInfoWindow: true,
    			    icons: {
	    			    default: {
	    			        normal: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Azure-icon.png',
	    			        selected: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Right-Azure-icon.png'
	    			    }
	    			},
	    			useMapTypeControl: true,
	    			zoomLevel: 15,
	    			showInfoWindow: true,
    		};
	    	var geoView = new google.visualization.DataView(dataTable);
			geoView.setColumns([9, 10]);
			
			map = new google.visualization.Map(document.getElementById('map_div'));
			map.draw(geoView, options);
			
			// Set a 'select' event listener for the table.
			// When the table is selected, we set the selection on the map.
			google.visualization.events.addListener(map_table, 'select',
			    function() {
			    	map.setSelection(map_table.getSelection());
			    });

			// Set a 'select' event listener for the map.
			// When the map is selected, we set the selection on the table.
			google.visualization.events.addListener(map, 'select',
			    function() {
					map_table.setSelection(map.getSelection());
			    });
    	}
    }
}



