from flask import Flask
from .user_data_processing import create_get_calculations_data


def register_get_calculations_blueprints(app: Flask):
    app.register_blueprint(create_get_calculations_data, url_prefix='/api/profile')