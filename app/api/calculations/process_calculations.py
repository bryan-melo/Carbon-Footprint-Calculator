from flask import Blueprint, request, jsonify
import sqlite3
import os

# Blueprint
create_calculations_blueprint = Blueprint('process_calculations', __name__)


# Route function
@create_calculations_blueprint.route('/process-calculations', methods=['POST'])
def process_calculations():
    try:
        # Retrieve JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Retrieve individual data from JSON
        accountId = data.get('accountId')
        date = data.get('date')
        electricityUsage = data.get('electricityUsage')
        fuelConsumption = data.get('fuelConsumption')
        wasteGenerated = data.get('wasteGenerated')
        waterUsage = data.get('waterUsage')
        totalEmissions = data.get('totalEmissions')
        
        if not all ([accountId, date, electricityUsage, fuelConsumption, wasteGenerated,  waterUsage, totalEmissions]):
            return jsonify({'error': 'Missing fields'}), 400
        
        # Connect to database
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'carbon_calc.db')
        
        with sqlite3.connect(db_path) as con:
            cursor = con.cursor()
            
            # Insert data into calculations table
            cursor.execute('''
                INSERT INTO calculations (accountId, date, electricityUsage, fuelConsumption, wasteGenerated, waterUsage, totalEmissions)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (accountId, date, electricityUsage, fuelConsumption, wasteGenerated, waterUsage, totalEmissions))
            
            # Commit the transaction
            con.commit()
        
        return jsonify({'message': 'Calculations inserted to database successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500