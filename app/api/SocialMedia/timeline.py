from flask import Blueprint, request, jsonify
import sqlite3
import os

# Blueprint
create_timeline_blueprint = Blueprint('timeline', __name__)
create_new_thread_blueprint = Blueprint('new_thread', __name__)


# Helper functions
def get_all_threads_data():
    # Get data from database:
        # thread ids
        # thread titles
        # thread dates
        # Number of comments per thread
        
    # Format data for JSON
    test_data = [
        {"id": 1, "title": "Reducing Carbon Footprint at Home", "date": "2024-01-05", "comments": 2},
        {"id": 2, "title": "Carbon Offset Strategies for Travel", "date": "2024-02-10", "comments": 2},
        {"id": 3, "title": "Reducing Plastic Waste in Daily Life", "date": "2024-03-15", "comments": 2},
        {"id": 4, "title": "The Impact of Diet on Climate Change", "date": "2024-04-20", "comments": 2},
    ]
    
    return test_data


def add_thread_to_database(con, id, title, author, date, content):
    # Insert new thread to database
    # Return True for success or False for unsuccessful entry
    return True
    

# Route functions
@create_timeline_blueprint.route('/get-timeline-data', methods=['GET'])
def get_timeline():
    try:
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            threads_data = get_all_threads_data()    

            if len(threads_data) < 1:
                return jsonify({'error': 'Thread data was not found'}), 401
            
            return jsonify(threads_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@create_new_thread_blueprint.route('/add-new-thread', methods=['POST'])
def add_new_thread():
    try:
        # Retrieve JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Retrieve individual data from JSON
        id = data.get('id')
        title = data.get('title')
        author = data.get('author')
        date = data.get('date')
        content = data.get('content')
        # comments = data.get('comments')
        
        if not all([id, title, author, date, content]):
            return jsonify({'error': 'Missing fields'}), 400
        
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            status = add_thread_to_database(con, id, title, author, date, content)
            
            if not status:
                return jsonify({'error': 'Could not add thread to database.'}), 409
            
        return jsonify({'message': 'Thread has been added successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500