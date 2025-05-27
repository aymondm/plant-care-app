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


@app.route("/api/plants", methods=["GET"])  # create route
def get_plants():
    return jsonify(plants)


@app.route("/api/plants", methods=["POST"])
def add_plant():
    data = request.get_json()  # incoming plant JSON
    if (
        not data.get("name")
        or not data.get("type")
        or not isinstance(data.get("interval"), int)
    ):  # data validation: checks that name and type keys exist and aren't empty
        return jsonify({"error": "Invalid input"}), 400
    new_id = (
        max((p["id"] for p in plants), default=0) + 1
    )  # generate new id (+1 current max)
    plant = {"id": new_id, **data}  # combine ID and data
    plants.append(plant)  # store
    return jsonify(plant), 201  # return plant and success code


@app.route("/api/plants/<int:id>", methods=["PUT"])
def update_plant(id):
    data = request.get_json()
    if (
        not data.get("name")
        or not data.get("type")
        or not isinstance(data.get("interval"), int)
    ):  # data validation
        return jsonify({"error": "Invalid input"}), 400
    for p in plants:
        if p["id"] == id:
            p.update(data)  # only update changed data
            return jsonify(p), 200
    return jsonify({"error": "Not found"}), 404


@app.route("/api/plants/<int:id>", methods=["DELETE"])
def delete_plant(id):
    new_plants = [
        p for p in plants if p["id"] != id
    ]  # creates a duplicate list without the given plant
    if len(new_plants) == len(plants):
        return jsonify({"error": "Not found"}), 404
    plants[:] = (
        new_plants  # replaces original plants with plants in new list by mutating the existing plants
    )
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)
