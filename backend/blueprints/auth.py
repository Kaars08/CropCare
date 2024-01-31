from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from models import User

auth = Blueprint("auth_blueprint", __name__)
bcrypt = Bcrypt()


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"userid": user.id})
    else:
        return jsonify({"error": "Invalid credentials"}), 401
