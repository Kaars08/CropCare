from flask import Blueprint

recomend = Blueprint("recomend_blueprint", __name__)


@recomend.route("/")
def recomend_func():
    return "This is recomendations"
