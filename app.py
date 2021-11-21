from flask import Flask, render_template, request, jsonify
from joblib import load
from pandas import DataFrame
# Flask Setup
app = Flask(__name__)
# load model
clf = load('random_forest_model_in_use.joblib')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/eda")
def fortune():
    return render_template("eda.html")

@app.route('/predict',methods=['POST'])
def predict():
    #For rendering results on HTML GUI
    payload = request.json
    try:
        input = DataFrame(data = {
            "smoker_yes": [int(payload["smoke_yes"])],
            "bmi": [float(payload["bmi"])],
            "age": [int(payload["age"])]
        })
    except:
        return jsonify({"cost": 0, "error": "invalid payload"})
    cost = clf.predict(input)
    return jsonify({"cost": cost[0]})
        
if __name__ == '__main__':
    app.run(debug=True)
