from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
from ml_pipeline import main

app = Flask(__name__)
CORS(app)

@app.route('/get_data', methods=['POST'])
def get_data():
    print(request.json)
    expiresAt = request.json['expires_at']
    store_id = request.json['store_id']
    date_obj = datetime.datetime.strptime(expiresAt, "%Y-%m-%d")
    expiresAt = date_obj.strftime("%Y-%m-%d")
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