d3.selectAll("button").on("click", function () {
    // error handling

    var age = d3.select("#age").property("value");
    var weight = d3.select("#weight").property("value");
    var feet = d3.select("#feet").property("value");
    var inch = d3.select("#inch").property("value");
    var smoke = d3.select('input[name="smoke"]:checked').node().value

    var height = (feet * 12 + inch);
    var bmi = (weight / (height * height)) * 70300
    console.log(age, weight, feet, inch, smoke, bmi);
    if (!weight) {
        return alert('Weight can not be empty')

    }
    if (!age) {
        return alert('Age can not be empty')
    }
    var data = {
        age: age,
        bmi,
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
        document.getElementById("output").innerHTML = "Cost: " + cost.toFixed(0)

    })
});

