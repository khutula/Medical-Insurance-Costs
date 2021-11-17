from flask import Flask, render_template

# Flask Setup
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/eda")
def fortune():
    return render_template("eda.html")

if __name__ == '__main__':
    app.run(debug=True)