d3.selectAll("button").on("click", function() {

    var age = d3.select("#age").property("value");
    var weight = d3.select("#weight").property("value");
    var feet = d3.select("#feet").property("value");
    var inch = d3.select("#inch").property("value");
    var smoke = d3.select('input[name="smoke"]:checked').node().value

    var height = (feet * 12 + inch);
    var bmi = (weight / (height*height)) * 70300
    console.log(age, weight, feet, inch, smoke, bmi);

});