from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# mimics a database
plants = [
    {"id": 1, "name": "Monstera", "type": "Monstera deliciosa", "interval": 3},
    {"id": 2, "name": "Pothos", "type": "Epipremmum aureum", "interval": 1},
    {"id": 3, "name": "Cactus", "type": "Carnegiea gigantea", "interval": 2},
]

@app.route("/api/plants", methods=["GET"])

def get_plants():
    return jsonify(plants)

if __name__ == "__main__":
    app.run(debug=True)