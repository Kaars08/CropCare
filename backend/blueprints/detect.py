from flask import Blueprint, jsonify, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from PIL import Image
import io
import requests

detect = Blueprint("detect_blueprint", __name__)
model = load_model("../model/disease_detect_model.h5")


def preprocess(image, target_size=(225, 225)):
    img = Image.open(io.BytesIO(image))
    img = img.convert("RGB")
    img = img.resize(target_size)

    x = img_to_array(img)
    x = x.astype("float32") / 255
    x = np.expand_dims(x, axis=0)
    return x


@detect.route("/")
def detect_index():
    user_id = request.args.get("user_id")

    img_response = requests.get(f"http://localhost:5000/api/auth/img/{user_id}")

    if img_response.status_code != 200:
        return jsonify({"error": "Failed to fetch image"}), img_response.status_code

    image_blob = img_response.content

    x = preprocess(image_blob, target_size=(225, 225))

    prediction = model.predict(x)

    labels = {0: "Healthy", 1: "Powdery", 2: "Rust"}

    pred_label = labels[np.argmax(prediction)]

    return jsonify({"prediction": pred_label})
