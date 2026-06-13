from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Subscription(db.Model):

    __tablename__ = "subscriptions"

    id = db.Column(db.Integer, primary_key=True)

    subscriber_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))

    plan = db.Column(db.String(50))
    access_level = db.Column(db.String(50))
    access_type = db.Column(db.String(100))

    trial_days = db.Column(db.Integer)

    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))

    status = db.Column(db.String(20))

    monthly_cost = db.Column(db.Float)

    payment_status = db.Column(db.String(20))

    last_payment_date = db.Column(db.String(20))

    next_billing_date = db.Column(db.String(20))


class AuditLog(db.Model):

    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)

    action = db.Column(db.String(100))

    subscriber_name = db.Column(
        db.String(100)
    )

    created_at = db.Column(
        db.DateTime
    )


class Payment(db.Model):

    __tablename__ = "payments"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    subscriber_name = db.Column(
        db.String(100)
    )

    plan = db.Column(
        db.String(50)
    )

    amount = db.Column(
        db.Float
    )

    status = db.Column(
        db.String(20)
    )

    payment_date = db.Column(
        db.String(20)
    )

    next_billing = db.Column(
        db.String(20)
    )