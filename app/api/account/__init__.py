from flask import Flask
from .create_account import create_account_blueprint
from .login import login_blueprint

def register_account_blueprints(app: Flask):
    app.register_blueprint(create_account_blueprint, url_prefix='/api')
    app.register_blueprint(login_blueprint, url_prefix='/api')