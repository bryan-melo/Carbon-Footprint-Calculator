from flask import Blueprint, request, jsonify
import sqlite3
import os


# Blueprint
create_get_calculations_data = Blueprint('get_calculations_data', __name__)


# Route function
@create_get_calculations_data.route('/get_calculation_data', methods=['GET'])
def get_calculations_data():
    try:
        # Retrieve the accountId from the request
        account_id = request.args.get('accountId')
        
        if not account_id:
            return jsonify({'error': 'No input account id provided'}), 400
        
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            cursor = con.cursor()
            
            # Execute query to select all calculations for the given account_id
            cursor.execute("""
                SELECT id, accountId, date, electricityUsage, fuelConsumption, 
                       wasteGenerated, waterUsage, totalEmissions
                FROM calculations
                WHERE accountId = ?
            """, (account_id,))
            
            # Fetch all rows
            rows = cursor.fetchall()

            if not rows:
                return jsonify({'error': 'No data found for the given account ID'}), 404
            
            # Prepare the data to return
            calculations = []
            for row in rows:
                calculation_data = {
                    'id': row[0],
                    'accountId': row[1],
                    'date': row[2],  
                    'electricityUsage': row[3],
                    'fuelConsumption': row[4],
                    'wasteGenerated': row[5],
                    'waterUsage': row[6],
                    'totalEmissions': row[7]
                }
                calculations.append(calculation_data)
            
            return jsonify(calculations)
            
            
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500