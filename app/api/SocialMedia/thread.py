from flask import Blueprint, request, jsonify
import sqlite3
import os

# Blueprint
create_thread_blueprint = Blueprint('thread_blueprint', __name__)
create_comments_blueprint = Blueprint('comments_blueprint', __name__)


# Helper functions
def get_thread_data(con, thread_id):
    cursor = con.cursor()
    query = """
        SELECT posts.post_title AS title, posts.post_date AS date,
            (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.post_id) AS comments_length,
            accounts.username AS author, posts.post_content AS content
        FROM posts
        JOIN accounts ON posts.account_id = accounts.account_id
        WHERE posts.post_id = ?;
    """
    cursor.execute(query, (thread_id,))
    row = cursor.fetchone()
    if row:
        return {
            "title": row[0],
            "date": row[1],
            "comments_length": row[2],
            "author": row[3],
            "content": row[4]
        }
    return None


def get_thread_comments(con, thread_id):
    cursor = con.cursor()
    query = """
        SELECT 
            content,
            comment_date AS date,
            accounts.username AS author
        FROM comments
        JOIN accounts ON comments.account_id = accounts.account_id
        WHERE post_id = ?
        ORDER BY comment_date ASC
    """
    cursor.execute(query, (thread_id,))
    rows = cursor.fetchall()
    return [{"content": row[0], "date": row[1], "author": row[2]} for row in rows] 


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
    

@create_comments_blueprint.route('/add-comment', methods=['POST'])
def add_comment():
    try:
        # Retrieve JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Retrieve individual data from JSON
        post_id = data.get('post_id')
        account_id = data.get('account_id')
        content = data.get('content')
        date = data.get('date')
        
        if not all ([post_id, account_id, content, date]):
            return jsonify({'error': 'Missing fields'}), 400
        
        # Connect to the database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            cursor = con.cursor()
            
            # Insert the comment into the comments table
            query = """
                INSERT INTO comments (post_id, account_id, content, comment_date) 
                VALUES (?, ?, ?, ?)
            """
            cursor.execute(query, (post_id, account_id, content, date))
            
            # Commit the changes
            con.commit()
        
        return jsonify({'message': 'Comment added successfully'}), 201
            
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        