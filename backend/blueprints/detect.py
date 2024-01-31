from flask import Blueprint, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

detect = Blueprint("detect_blueprint", __name__)
model = load_model("../model/model.h5")


def preprocess(image_path, target_size=(225, 225)):
    img = load_img(image_path, target_size=target_size)
    x = img_to_array(img)
    x = x.astype("float32") / 255
    x = np.expand_dims(x, axis=0)
    return x


@detect.route("/")
def detect_index():
    image_path = "test.jpg"

    x = preprocess(image_path, target_size=(225, 225))

    prediction = model.predict(x)

    labels = {0: "Healthy", 1: "Powdery", 2: "Rust"}

    pred_label = labels[np.argmax(prediction)]

    return jsonify({"prediction": pred_label})
