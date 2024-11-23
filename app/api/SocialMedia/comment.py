from flask import Blueprint, request, jsonify
import sqlite3
import os

# Blueprint
create_timeline_blueprint = Blueprint('comment', __name__)


# Helper functions

def add_comment_to_database(con, id, user_id, post_id, date, text):
    # Insert new thread to database
    sql_insert_query = '''INSERT INTO comment (comment_id, user_id, post_id, comment_text, comment_date) 
    VALUES(?, ?, ?, ?, ?)
'''
    con.execute(sql_insert_query, (id, user_id, post_id, text, date))
    con.commit()
    # Return True for success or False for unsuccessful entry
    return True
    

# Route functions

@create_new_comment_blueprint.route('/add-new-comment', methods=['POST'])
def add_new_comment():
    try:
        # Retrieve JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Retrieve individual data from JSON
        id = data.get('id')
        post_id = data.get('post_id')
        user_id = data.get('user_id')
        date = data.get('date')
        text = data.get('text')

        
        if not all([id, user_id, post_id,  date, text]):
            return jsonify({'error': 'Missing fields'}), 400
        
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            status = add_comment_to_database(con, id, user_id, post_id,  date, text)
            
            if not status:
                return jsonify({'error': 'Could not add comment to database.'}), 409
            
        return jsonify({'message': 'Comment has been added successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500