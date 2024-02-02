from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    userid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    image = db.Column(db.LargeBinary, nullable=True)
    N = db.Column(db.Integer)
    P = db.Column(db.Integer)
    K = db.Column(db.Integer)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    ph = db.Column(db.Float)
    rainfall = db.Column(db.Float)

    def __init__(
        self,
        username,
        email,
        password,
        latitude=None,
        longitude=None,
        image=None,
        N=None,
        P=None,
        K=None,
        temperature=None,
        humidity=None,
        ph=None,
        rainfall=None,
    ):
        self.username = username
        self.email = email
        self.password = password
        self.latitude = latitude
        self.longitude = longitude
        self.image = image
        self.N = N
        self.P = P
        self.K = K
        self.temperature = temperature
        self.humidity = humidity
        self.ph = ph
        self.rainfall = rainfall
