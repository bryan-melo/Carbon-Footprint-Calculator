from flask import Flask, render_template
#from app.features.results.api import register_graph_blueprints
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register blueprints
#register_graph_blueprints(app)


@app.route('/')
def homepage():
    return render_template('homepage.html')


@app.route('/calculate')
def calculate_page():
    return render_template('calculate.html')


@app.route('/forums')
def forums_page():
    return render_template('forums.html')


@app.route('/about')
def about_page():
    return render_template('about.html')


@app.route('/login')
def login_page():
    return render_template('login.html')


@app.route('/create-account')
def create_account_page():
    return render_template('create-account.html')


# Test page
@app.route('/test')
def test_page():
    return render_template('test.html')


if __name__ == '__main__':
    app.run(debug=True)
