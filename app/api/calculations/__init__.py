from flask import Flask
from .process_calculations import create_calculations_blueprint


def register_calculations_blueprints(app: Flask):
    app.register_blueprint(create_calculations_blueprint, url_prefix='/api/calculations')