const url = "../Resources/insurance.csv";

// Fetch the JSON data and console log it
d3.csv(url).then(function(data) {
  var list = [];
  for (var i=0; i<data.length; i++) {
    list[i] = parseFloat(data[i].charges);
  };

  var highlight = [];
  for (var i=0; i<200; i++) {
    highlight[i] = 12500; 
  };

  CreateChart(list, highlight);
});
 
function CreateChart(list, highlight) {

  var trace1 = {
    x: list,
    type: "histogram",
    opacity: 1,
    name: 'Historical',
  };

  var trace2 = {
    x: highlight,
    type: "histogram",
    opacity: 0.5,
    name: 'You',
  };

  var hist = [trace1, trace2];
  var layout = {
    barmode: "overlay",
    paper_bgcolor: '#DCD4D2',
    plot_bgcolor: '#DCD4D2',
    colorway: ['#A7E0D7','#E65401','#FEF200'],
    font: {
      color: '#0C1F38'
    },
    legend: {
      color: '#0C1F38',
      bordercolor: '#0C1F38',
      borderwidth: 2
    },
};

  Plotly.newPlot("plot", hist, layout, {responsive: true});
};
