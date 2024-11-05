from flask import Blueprint, request, jsonify
import sqlite3
import os
import bcrypt

# Blueprint
login_blueprint = Blueprint('login', __name__)


# Helper function
def validate_credentials(con, username, password):
    cur = con.cursor()
    cur.execute("SELECT * FROM accounts WHERE username = ?", (username,))
    result = cur.fetchone()
    cur.close()
    
    # Username found in database
    if result:
        # Check if password matches
        hashed_password = result[3]
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            data = {
                "accountId": result[0],
                "username": result[1],
                "email": result[2],
                "firstName": result[4],
                "lastName": result[5]
            }
            return data
        else:
            return None
    else:
        return None


# Route function
@login_blueprint.route('/login', methods=['POST'])
def login():
    try:
        # Retrieve JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Retrieve individiual data
        username = data.get('username')
        password = data.get('password')
        
        if not all([username, password]):
            return jsonify({'error': 'Missing fields'}), 400
        
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            # Check for existing user
            account = validate_credentials(con, username, password)
            
            if not account:
                return jsonify({'account_error': 'Invalid username or password'}), 401 
            
        return jsonify(account), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
