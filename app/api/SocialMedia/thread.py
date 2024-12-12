from flask import Blueprint, request, jsonify
import sqlite3
import os

# Blueprint
create_thread_blueprint = Blueprint('thread_blueprint', __name__)

# Helper functions
def get_thread_data(con, thread_id):
    cursor = con.cursor()
    query = """
        SELECT 
            post_title AS title,
            post_date AS date,
            (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.post_id) AS comments_length,
            account_id AS author,
            post_content AS content
        FROM posts
        WHERE post_id = ?
    """
    cursor.execute(query, (thread_id,))
    row = cursor.fetchone()
    if row:
        return {
            "title": row[0],
            "date": row[1],
            "comments_length": row[2],
            "author": f"User {row[3]}",  # Assuming author is linked to `accounts`
            "content": row[4]
        }
    return None


def get_thread_comments(con, thread_id):
    cursor = con.cursor()
    query = """
        SELECT 
            content,
            comment_date AS date
        FROM comments
        WHERE post_id = ?
        ORDER BY comment_date ASC
    """
    cursor.execute(query, (thread_id,))
    rows = cursor.fetchall()
    return [{"content": row[0], "date": row[1], "author": "Anonymous"} for row in rows]  # Replace author with actual data if available


# Route function
@create_thread_blueprint.route('/get-thread/<int:thread_id>', methods=['GET'])
def get_thread(thread_id):
    try:
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            thread_data = get_thread_data(con, thread_id)
            if not thread_data:
                return jsonify({'error': 'Thread not found'}), 404
            
            thread_comments = get_thread_comments(con, thread_id)
            thread_data["comments"] = thread_comments
            
        return jsonify(thread_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500