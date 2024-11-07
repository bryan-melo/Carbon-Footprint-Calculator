from flask import Blueprint, request, jsonify
import sqlite3
import os
import bcrypt

# Blueprint
create_account_blueprint = Blueprint('create_account', __name__)


# Helper functions
def check_existing_username(con, username):
    cur = con.cursor()
    cur.execute("SELECT 1 FROM accounts WHERE username = ?", (username,))
    username_exist = cur.fetchone()
    cur.close()
    return "Username already exists!" if username_exist else None


def check_existing_email(con, email):
    cur = con.cursor()
    cur.execute("SELECT 1 FROM accounts WHERE email = ?", (email,))
    email_exist = cur.fetchone()
    cur.close()
    return "Email already exists!" if email_exist else None


# Route function
@create_account_blueprint.route('/create-account', methods=['POST'])
def create_account():
    try:
        # Retrieve JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Retrieve individual data from JSON
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')

        if not all([username, email, password, first_name, last_name]):
            return jsonify({'error': 'Missing fields'}), 400

        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            # Check for existing user
            username_exists = check_existing_username(con, username)
            email_exists = check_existing_email(con, email)
            
            if username_exists:
                return jsonify({'username_error': username_exists}), 409
            
            if email_exists:
                return jsonify({'email_error': email_exists}), 409
            
            # Add salt and Hash password
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
        
            # Create query and insert into database
            sql_insert_query = '''
                INSERT INTO accounts (username, email, password, first_name, last_name)
                VALUES (?, ?, ?, ?, ?)
            '''
            
            con.execute(sql_insert_query, (username, email, hashed_password, first_name, last_name))
            con.commit()
   
        return jsonify({'message': 'Account created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
