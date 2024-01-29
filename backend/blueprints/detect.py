from flask import Blueprint

detect = Blueprint("detect_blueprint", __name__)


@detect.route("/")
def detect_index():
    return "This is detections"
