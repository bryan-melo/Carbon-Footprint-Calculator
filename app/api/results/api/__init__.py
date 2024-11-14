from flask import Flask
from .graph_api import graph_blueprint
from .graph_api import process_data_blueprint

def register_graph_blueprints(app: Flask):
    app.register_blueprint(graph_blueprint, url_prefix='/api')
    app.register_blueprint(process_data_blueprint, url_prefix='/api')