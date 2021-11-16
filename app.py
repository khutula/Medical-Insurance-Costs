from flask import Flask, render_template

# Flask Setup
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/page1")
def fortune():
    return render_template("page1.html")

@app.route("/page2")
def map():
    return render_template("page2.html")

@app.route("/page3")
def find():
    return render_template("page3.html")

@app.route("/page4")
def ratings():
    return render_template("page4.html")

if __name__ == '__main__':
    app.run(debug=True)