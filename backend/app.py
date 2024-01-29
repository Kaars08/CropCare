from flask import Flask

from blueprints.forecast import forecast
from blueprints.detect import detect
from blueprints.recomend import recomend
from blueprints.irrigation import irrigation

app = Flask(__name__)
app.register_blueprint(forecast, url_prefix="/api/forecast")
app.register_blueprint(detect, url_prefix="/api/detect")
app.register_blueprint(recomend, url_prefix="/api/recomend")
app.register_blueprint(irrigation, url_prefix="/api/irrigation")


@app.route("/")
def index():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
