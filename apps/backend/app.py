from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # allows any origin on /api/*

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///plants.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Plant(db.Model):
    __tablename__ = "plants"

    id = db.Column(db.Integer, primary_key=True)  # auto increments the key
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    watering_interval = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "watering_interval": self.watering_interval,
        }


@app.route("/api/plants", methods=["GET"])  # create route
def get_plants():
    plants = (
        Plant.query.all()
    )  # fetches all Plant objects (each row from the plants table)
    result = [
        plant.to_dict() for plant in plants
    ]  # converts each Plant object into a dictionary
    return jsonify(result), 200


@app.route("/api/plants", methods=["POST"])
def add_plant():
    # example: {"name": "Fiddle Leaf", "type": "tree", "watering_interval": 10}
    data = request.get_json()
    if (
        not data.get("name")
        or not data.get("type")
        or not data.get("watering_interval")
    ):  # data validation
        return jsonify({"error": "Invalid input"}), 400

    plant = Plant(**data)  # create Plant object
    db.session.add(plant)
    db.session.commit()

    return jsonify(plant.to_dict()), 201


@app.route("/api/plants/<int:id>", methods=["PUT"])
def update_plant(id):
    data = request.get_json()
    plant = Plant.query.get(id)  # retrieve row by primary key
    if not plant:
        return jsonify({"error": "Plant not found"}), 404

    if data.get("name"):
        plant.name = data["name"]
    if data.get("type"):
        plant.type = data["type"]
    if data.get("watering_interval"):
        plant.watering_interval = data["watering_interval"]

    db.session.commit()  # saves changes
    return jsonify(plant.to_dict()), 200


@app.route("/api/plants/<int:id>", methods=["DELETE"])
def delete_plant(id):
    plant = Plant.query.get(id)
    if not plant:
        return jsonify({"error": "Plant not found"}), 404

    db.session.delete(plant)
    db.session.commit()
    return jsonify({}), 204


@app.route("/api/plants/<int:id>", methods=["GET"])  # returns a single plant
def get_plant(id):
    plant = Plant.query.get(id)
    if not plant:
        return jsonify({"error": "Plant not found"}), 404
    return jsonify(plant.to_dict()), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
