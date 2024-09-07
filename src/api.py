from flask import Flask, request, jsonify
import datetime
from ml_pipeline import main

app = Flask(__name__)


@app.route('/get_data', methods=['GET'])
def get_data():
    expiresAt = request.args.get('expiresAt')
    store_id = request.args.get('store_id')
    
    # Validate inputs
    if not expiresAt or not store_id:
        return jsonify({"error": "Missing expiresAt or store_id"}), 400
    
    # Ensure entry_date is in a correct format (YYYY-MM-DD)
    try:
        datetime.datetime.strptime(expiresAt, '%Y-%m-%d')
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    
    # Fetch data from the backend
    data = main(expiresAt, int(store_id))
    
    if not data:
        return jsonify({"message": "No data found"}), 404

    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)