from flask import Blueprint

irrigation = Blueprint("irrigation_blueprint", __name__)


@irrigation.route("/")
def irrigation_index():
    return "This is irrigations"
