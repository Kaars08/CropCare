from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)


class Geolocation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship(User, back_populates="geolocation")

    def __init__(self, latitude=None, longitude=None):
        if latitude is None:
            latitude = 0
        if longitude is None:
            longitude = 0

        self.latitude = latitude
        self.longitude = longitude
