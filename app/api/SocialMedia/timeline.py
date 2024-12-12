from flask import Blueprint, request, jsonify
import sqlite3
import os

# Blueprint
create_timeline_blueprint = Blueprint('timeline', __name__)
create_new_thread_blueprint = Blueprint('new_thread', __name__)


# Helper functions
def get_all_threads_data(con):
    cursor = con.cursor()
    query = """
        SELECT 
            post_id AS id, 
            post_title AS title, 
            post_date AS date, 
            (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.post_id) AS comments
        FROM posts
        ORDER BY post_date ASC
    """
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows)
    return [{"id": row[0], "title": row[1], "date": row[2], "comments": row[3]} for row in rows]


def add_thread_to_database(con, account_id, title, date, content):
    try:
        cursor = con.cursor()
        query = "INSERT INTO posts (account_id, post_title, post_date, post_content) VALUES (?, ?, ?, ?)"
        cursor.execute(query, (account_id, title, date, content))
        con.commit()
        return True
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return False
    

# Route functions
@create_timeline_blueprint.route('/get-timeline-data', methods=['GET'])
def get_timeline():
    try:
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            threads_data = get_all_threads_data(con)    

            if len(threads_data) < 1:
                return jsonify({'error': 'Thread data was not found'}), 401
            
            return jsonify(threads_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@create_new_thread_blueprint.route('/add-new-thread', methods=['POST'])
def add_new_thread():
    try:
        # Connect to the database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        data = request.json
        
        with sqlite3.connect(db_path) as con:
            cursor = con.cursor()
            # Insert new thread
            query = """
                INSERT INTO posts (account_id, post_title, post_date, post_content)
                VALUES (?, ?, ?, ?)
            """
            cursor.execute(query, (data['accountId'], data['title'], data['date'], data['content']))
            con.commit()
            
            # Get the ID of the new thread
            new_thread_id = cursor.lastrowid
        
        return jsonify({"message": "Thread added successfully.", "thread_id": new_thread_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500