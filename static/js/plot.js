const url = "static/Resources/insurance.csv";

d3.selectAll("button").on("click", function () {
    // error handling
    // Fetch the JSON data and console log it
    d3.csv(url).then(function(datas) {
      let list = [];
      for (var i=0; i<datas.length; i++) {
        list[i] = parseFloat(datas[i].charges);
      };
  
    var age = d3.select("#age").property("value");
    var weight = d3.select("#weight").property("value");
    var feet = d3.select("#feet").property("value");
    var inch = d3.select("#inch").property("value");
    var smoke = d3.select('input[name="smoke"]:checked').node().value

    var height = (parseFloat(feet * 12) + parseFloat(inch));
    var bmi = (weight / (height * height)) * 703
    
    console.log(age, weight, feet, inch, height, smoke, bmi);
    if (!weight) {
        return alert('Weight can not be empty')

    }
    if (!age) {
        return alert('Age can not be empty')
    }
    var data = {
        age: age,
        bmi: bmi,
        smoke_yes: smoke
    }
    console.log(data)

    
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
    .then(d => {
        console.log('response', d)
        var cost = d.cost
        // d3.select("#output").property("value", cost);
        document.getElementById("output").innerHTML = "Annual Cost: $" + cost.toFixed(0);
        CreateChart(list, cost);
        });
    });
});
  
function CreateChart(list, cost) {

//    let cost = d3.select("#output").property("value", cost);
    let highlight = [];
        for (var i=0; i<200; i++) {
            highlight[i] = cost;   
        };
    
  var trace1 = {
    x: list,
    type: "histogram",
    opacity: 1,
    name: 'Historical',
  };

  var trace2 = {
    x: highlight,
    type: "histogram",
    opacity: 0.6,
    name: 'You',
  };

  var hist = [trace1, trace2];
  var layout = {
    barmode: "overlay",
    paper_bgcolor: '#DCD4D2',
    plot_bgcolor: '#DCD4D2',
    colorway: ['#0C1F38','#E65401','#FEF200'],
    font: {
      color: '#0C1F38'
    },
    legend: {
      color: '#0C1F38',
      bordercolor: '#0C1F38',
      borderwidth: 2
    },
    title: {
      text: 'Distribution of Charges'
    },
    xaxis: {
        title: {
            text: 'Charges'
        },
    },
    yaxis: {
        title: {
            text: 'Density'
        },
    },
};
    
  Plotly.newPlot("percentile", hist, layout, {responsive: true});
};
