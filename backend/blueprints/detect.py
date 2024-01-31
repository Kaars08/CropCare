from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from models import db, User, Geolocation

detect = Blueprint("detect_blueprint", __name__)


@detect.route("/")
def detect_index():
    id = request.args.get("id")

    user = User.query.get(id)
    return jsonify({"Hello": "world"})
