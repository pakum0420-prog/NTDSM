from flask import Flask
from flask_cors import CORS
from models import db
from routes import register_routes
import os

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:root123@localhost/subscription_manager"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

register_routes(app)

with app.app_context():
    db.create_all()


@app.route("/health")
def health():
    return {
        "status": "ok",
        "project": "digital-subscription-paywall"
    }


@app.route("/")
def home():
    return {
        "message": "Digital Subscription Manager API Running"
    }


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)