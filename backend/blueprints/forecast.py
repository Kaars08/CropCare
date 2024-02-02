from flask import Blueprint, request
import requests
from models import User

forecast = Blueprint("forecast_blueprint", __name__)

apikey = "4d7d13f96d9240299c310930243101"
url = "http://api.weatherapi.com/v1/forecast.json?"


@forecast.route("/")
def forecast_index():
    user_id = request.args.get("user_id")
    user = User.query.get(user_id)

    if user:
        latitude = user.latitude
        longitude = user.longitude

        response = requests.get(
            f"{url}key={apikey}&q={latitude},{longitude}&api=no&days=3"
        )
        return response.json()

    return {"message": "User not found"}
