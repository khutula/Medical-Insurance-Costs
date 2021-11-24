d3.selectAll("button").on("click", function () {
    
    var age = d3.select("#age").property("value");
    var weight = d3.select("#weight").property("value");
    var feet = d3.select("#feet").property("value");
    var inch = d3.select("#inch").property("value");
    var smoke = d3.select('input[name="smoke"]:checked').node().value;

    var height = (parseFloat(feet * 12) + parseFloat(inch));
    var bmi = (weight / (height * height)) * 703;
    console.log(age, weight, feet, inch, height, smoke, bmi);

    // error handling
    if (!weight) {
        return alert('Weight can not be empty');
    };

    if (!age) {
        return alert('Age can not be empty');
    };

    var data = {
        age: age,
        bmi: bmi,
        smoke_yes: smoke
    };

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

        document.getElementById("output").innerHTML = "Annual Cost: $" + cost.toFixed(0);

    });
});

