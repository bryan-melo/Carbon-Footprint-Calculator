from flask import Flask, render_template
from .features.account import register_account_blueprints
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register blueprints
register_account_blueprints(app)


@app.route('/')
def homepage():
    return render_template('homepage.html')


@app.route('/profile')
def profile_page():
    return render_template('profile.html')

@app.route('/calculate')
def calculate_page():
    return render_template('calculate.html')


@app.route('/forums')
def forums_page():
    return render_template('forums.html')


if __name__ == '__main__':
    app.run(debug=True)
