from flask import Blueprint, request, jsonify, render_template
import pandas as pd
import plotly.express as px

# Create Blueprint for Graph API
graph_blueprint = Blueprint('graph_api', __name__)
process_data_blueprint = Blueprint('process_data', __name__)


@graph_blueprint.route('/graph', methods=['GET'])
def graph():
    return jsonify(message="Hello World! From Graph API")


@process_data_blueprint.route('/process', methods=['POST'])
def process_data():
    if request.method == 'POST':
        data = request.get_json()
        
        # Convert the JSON data (grouped) into a DataFrame
        df = pd.DataFrame(data)

        # Example: create a simple bar chart
        fig = px.bar(df, x='model', y='mileage', title='Mileage per Car Model')

        # Convert the Plotly graph to HTML, keeping only the necessary divs and scripts
        graph_html = fig.to_html(full_html=False, include_plotlyjs='cdn')  # Use 'cdn' to include Plotly.js from CDN

        # Return the HTML of the graph to be injected into the page
        return graph_html

