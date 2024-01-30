import os
from flask import Flask
from models import db
from dotenv import load_dotenv
from flask_cors import CORS

from blueprints.auth import auth
from blueprints.forecast import forecast
from blueprints.detect import detect
from blueprints.recomend import recomend
from blueprints.irrigation import irrigation

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
db.init_app(app)

CORS(app)

app.register_blueprint(auth, url_prefix="/api/auth")
app.register_blueprint(forecast, url_prefix="/api/forecast")
app.register_blueprint(detect, url_prefix="/api/detect")
app.register_blueprint(recomend, url_prefix="/api/recomend")
app.register_blueprint(irrigation, url_prefix="/api/irrigation")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
