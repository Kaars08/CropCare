from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from blueprints.forecast import forecast
from blueprints.detect import detect
from blueprints.recomend import recomend
from blueprints.irrigation import irrigation


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SECRET_KEY"] = "your_secret_key"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password


app.register_blueprint(forecast, url_prefix="/api/forecast")
app.register_blueprint(detect, url_prefix="/api/detect")
app.register_blueprint(recomend, url_prefix="/api/recomend")
app.register_blueprint(irrigation, url_prefix="/api/irrigation")


@app.route("/")
def index():
    return "Hello World!"


@app.route("/api/auth/login", method=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"userid": user.id})
    else:
        return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/auth/register", method=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"error": "User already exists"}), 409
    else:
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        user = User(email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"userid": user.id}), 201


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
