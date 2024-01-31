from flask import Blueprint, jsonify

detect = Blueprint("detect_blueprint", __name__)


@detect.route("/")
def detect_index():
    return jsonify({"Hello": "world"})
