from flask import Blueprint, request, jsonify
import numpy as np
import joblib
import os
from models import User

model_path = os.path.abspath("/home/try/Projects/CropCare/model/recomend_model.h5")
lightgbm_model = joblib.load("../model/crop_recomend_model.pkl")

recomend = Blueprint("recomend_blueprint", __name__)


@recomend.route("/")
def recomend_func():
    userid = request.args.get("userid")

    user = User.query.get(userid)

    if user:
        N = user.N
        P = user.P
        K = user.K
        temperature = user.temperature
        humidity = user.humidity
        ph = user.ph
        rainfall = user.rainfall

        input_array = np.array([N, P, K, temperature, humidity, ph, rainfall]).reshape(
            1, -1
        )

        prediction = lightgbm_model.predict(input_array)[0]

        return jsonify(
            {
                "prediction": prediction,
                "nitrogen": N,
                "phosophorous": P,
                "potassium": K,
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall,
            }
        )

    return jsonify({"error": "User not found"})
