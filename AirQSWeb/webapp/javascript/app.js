google.charts.load('current', {'mapsApiKey': 'AIzaSyD255S7DmC6HY5EZZVLxSbt9MmlB-8RJMw', 'packages': ['table', 'map', 'corechart']});
google.charts.setOnLoadCallback(initialize);

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
        $('raw_data').innerText = data;
        // $('.greeting-content').append(data.content); 
    })
}

function draw(response) {
//  if (response.isError()) {
//    alert('Error in query');
//  }

  //var ticketsData = response.getDataTable();
  var geoData = new google.visualization.DataTable(response);
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  
  chart.draw(geoData, {'isStacked': true, 'legend': 'bottom',
      'vAxis': {'title': 'Number of tickets'}});

//  var geoData = google.visualization.arrayToDataTable([
//	['mq7=5.5, mq3=4.4, mq135=2.2, mq2=3.3, hum=1.1, temp=7.7, pressure=6.6, timestamp=1526075346583, lat=44.234, lng=23.235456576, getId()=35
//    ['Lat', 'Lon', 'Name', 'Food?'],
//    [51.5072, -0.1275, 'Cinematics London', true],
//    [48.8567, 2.3508, 'Cinematics Paris', true],
//    [55.7500, 37.6167, 'Cinematics Moscow', false]]);
  //var geoData = new google.visualization.DataTable(response);
  var geoView = new google.visualization.DataView(geoData);
  geoView.setColumns([0, 1]);

  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(geoData, {showRowNumber: false, width: '100%', height: '100%'});

  var map = new google.visualization.Map(document.getElementById('map_div'));
  map.draw(geoView, {showTip: true});

  // Set a 'select' event listener for the table.
  // When the table is selected, we set the selection on the map.
  google.visualization.events.addListener(table, 'select',
      function() {
        map.setSelection(table.getSelection());
      });

  // Set a 'select' event listener for the map.
  // When the map is selected, we set the selection on the table.
  google.visualization.events.addListener(map, 'select',
      function() {
	   
        table.setSelection(map.getSelection());
      });
}