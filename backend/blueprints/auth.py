from flask import Blueprint, request, jsonify, send_file
from flask_bcrypt import Bcrypt
from models import User, db
from io import BytesIO

auth = Blueprint("auth_blueprint", __name__)
bcrypt = Bcrypt()


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"userid": user.userid})
    else:
        return jsonify({"error": "Invalid credentials"}), 401


@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        latitude=latitude,
        longitude=longitude,
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"userid": new_user.userid}), 201


@auth.route("/img/<int:userid>")
def get_img(userid):
    user = User.query.get(userid)
    if user:
        image_data = BytesIO(user.image)
        return send_file(image_data, mimetype="image/jpeg")
    else:
        return jsonify({"error": "User not found"}), 404
