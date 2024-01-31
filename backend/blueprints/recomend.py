from flask import Blueprint, request, jsonify
import numpy as np
import joblib
import os

model_path = os.path.abspath("/home/try/Projects/CropCare/model/recomend_model.h5")
lightgbm_model = joblib.load("../model/crop_recomend_model.pkl")

recomend = Blueprint("recomend_blueprint", __name__)


@recomend.route("/")
def recomend_func():
    N = float(request.args.get("N", 0.0))
    P = float(request.args.get("P", 0.0))
    K = float(request.args.get("K", 0.0))
    temperature = float(request.args.get("temperature", 0.0))
    humidity = float(request.args.get("humidity", 0.0))
    ph = float(request.args.get("ph", 0.0))
    rainfall = float(request.args.get("rainfall", 0.0))

    input_array = np.array([N, P, K, temperature, humidity, ph, rainfall]).reshape(
        1, -1
    )

    prediction = lightgbm_model.predict(input_array)[0]

    return jsonify({"prediction": prediction})
