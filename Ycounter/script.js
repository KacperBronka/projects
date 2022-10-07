google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Gsoogle Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
function clamp(num, min, max) {
  return num <= min
    ? min
    : num >= max
      ? max
      : num
}

let inputs = document.querySelectorAll(".inputs input[type='number']");
console.log(inputs[0].value)
function drawChart() {
  // Create the data table.

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Czas lekcji');
  data.addColumn('number', 'Liczba Y');
  data.addColumn({role:'style',type:'string'});


  data.addRows([
    ['0-5',parseInt(inputs[0].value), `hsl(190deg,100%,${clamp(inputs[0].value, 25, 80)}%)`],
    ['5-10',parseInt(inputs[1].value), `hsl(190deg,100%,${clamp(inputs[1].value, 25, 80)}%)`],
    ['10-15',parseInt(inputs[2].value), `hsl(190deg,100%,${clamp(inputs[2].value, 25, 80)}%)`],
    ['15-20',parseInt(inputs[3].value), `hsl(190deg,100%,${clamp(inputs[3].value, 25, 80)}%)`],
    ['20-25',parseInt(inputs[4].value), `hsl(190deg,100%,${clamp(inputs[4].value, 25, 80)}%)`],
    ['25-30',parseInt(inputs[5].value), `hsl(190deg,100%,${clamp(inputs[5].value, 25, 80)}%)`],
    ['30-35',parseInt(inputs[6].value), `hsl(190deg,100%,${clamp(inputs[6].value, 25, 80)}%)`],
    ['35-40',parseInt(inputs[7].value), `hsl(190deg,100%,${clamp(inputs[7].value, 25, 80)}%)`],
    ['40-45',parseInt(inputs[8].value), `hsl(190deg,100%,${clamp(inputs[8].value, 25, 80)}%)`],
  ]);

  //   var data = google.visualization.arrayToDataTable([
  //     ['Czas', 'Ilosc y', { role: 'style' }],
  //     ['0-5', inputs[0].value, `hsl(190deg,100%,${clamp(inputs[0].value,25,80)}%)`],
  //     ['5-10', inputs[1].value, `hsl(190deg,100%,${clamp(inputs[1].value,25,80)}%)`],            
  //     ['10-15', inputs[2].value, `hsl(190deg,100%,${clamp(inputs[2].value,25,80)}%)`],            
  //     ['15-20', inputs[3].value, `hsl(190deg,100%,${clamp(inputs[3].value,25,80)}%)`],
  //     ['20-25', inputs[4].value, `hsl(190deg,100%,${clamp(inputs[4].value,25,80)}%)` ], 
  //     ['25-30', inputs[5].value, `hsl(190deg,100%,${clamp(inputs[5].value,25,80)}%)` ], 
  //     ['30-35', inputs[6].value, `hsl(190deg,100%,${clamp(inputs[6].value,25,80)}%)` ], 
  //     ['35-40', inputs[7].value, `hsl(190deg,100%,${clamp(inputs[7].value,25,80)}%)` ], 
  //     ['40-45', inputs[8].value, `hsl(190deg,100%,${clamp(inputs[8].value,25,80)}%)` ], 
  //  ]);

  // Set chart options
  var options = {
    title: "Y",
    width: 600,
    height: 400,
    hAxis:{
    viewWindow:{
      min:0
    }},
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(
    document.querySelector("#chart")
  );
  chart.draw(data, options);
}
