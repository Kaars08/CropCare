from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    latitude = db.Column(db.Integer, nullable=False)
    longitude = db.Column(db.Integer, nullable=False)

    def __init__(self, email, password, latitude=0, longitude=0):
        self.email = email
        self.password = password
        self.latitude = longitude
        self.longitude = latitude
