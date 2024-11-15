from flask import Flask, render_template
from .api.account import register_account_blueprints
from .api.SocialMedia import register_social_media_blueprints
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register blueprints
register_account_blueprints(app)
register_social_media_blueprints(app)


@app.route('/')
def homepage():
    return render_template('homepage.html')


@app.route('/create-account')
def create_account():
    return render_template('create-account.html')


@app.route('/profile')
def profile_page():
    return render_template('profile.html')


@app.route('/calculate')
def calculate_page():
    return render_template('calculate.html')


@app.route('/social-media')
def social_media_page():
    return render_template('social-media.html')


@app.route('/social-media-thread/<int:user_id>')
def social_media_thread_page(user_id):
    return render_template('social-media-thread.html', user_id=user_id)


if __name__ == '__main__':
    app.run(debug=True)
