from flask import Blueprint

forecast = Blueprint("forecast_blueprint", __name__)


@forecast.route("/")
def forecast_index():
    return "This is forecast"
