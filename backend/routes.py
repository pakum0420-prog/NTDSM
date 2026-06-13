from flask import request, jsonify
from datetime import datetime
from models import db, Subscription, Payment, AuditLog

def register_routes(app):

    # ==========================
    # GET ALL SUBSCRIPTIONS
    # ==========================
    @app.route("/api/subscriptions", methods=["GET"])
    def get_subscriptions():
        subscriptions = Subscription.query.all()
        result = [{
            "id": s.id,
            "subscriber_name": s.subscriber_name,
            "email": s.email,
            "phone": s.phone,
            "plan": s.plan,
            "access_level": s.access_level,
            "access_type": s.access_type,
            "trial_days": s.trial_days,
            "start_date": s.start_date,
            "end_date": s.end_date,
            "status": s.status,
            "monthly_cost": s.monthly_cost,
            "payment_status": s.payment_status,
            "last_payment_date": s.last_payment_date,
            "next_billing_date": s.next_billing_date
        } for s in subscriptions]
        
        return jsonify(result)

    # ==========================
    # CREATE SUBSCRIPTION
    # ==========================
    @app.route("/api/subscriptions", methods=["POST"])
    def create_subscription():
        data = request.get_json(silent=True) or {}
        
        try:
            subscription = Subscription(
                subscriber_name=data.get("subscriber_name"),
                email=data.get("email"),
                phone=data.get("phone"),
                plan=data.get("plan"),
                access_level=data.get("access_level"),
                access_type=data.get("access_type"),
                trial_days=data.get("trial_days"),
                start_date=data.get("start_date"),
                end_date=data.get("end_date"),
                status=data.get("status", "Active"),
                monthly_cost=data.get("monthly_cost"),
                payment_status=data.get("payment_status", "Pending"),
                last_payment_date=data.get("last_payment_date"),
                next_billing_date=data.get("next_billing_date")
            )

            db.session.add(subscription)
            
            log = AuditLog(
                action="Created",
                subscriber_name=subscription.subscriber_name,
                created_at=datetime.now()
            )
            db.session.add(log)
            db.session.commit()

            return jsonify({"message": "Subscription Created Successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    # ==========================
    # UPDATE SUBSCRIPTION
    # ==========================
    @app.route("/api/subscriptions/<int:id>", methods=["PUT"])
    def update_subscription(id):
        subscription = db.session.get(Subscription, id)
        if not subscription:
            return jsonify({"message": "Subscription Not Found"}), 404

        data = request.get_json(silent=True) or {}
        
        # Update fields only if they are provided in the request
        for key, value in data.items():
            if hasattr(subscription, key):
                setattr(subscription, key, value)

        try:
            log = AuditLog(
                action="Updated",
                subscriber_name=subscription.subscriber_name,
                created_at=datetime.now()
            )
            db.session.add(log)
            db.session.commit()
            return jsonify({"message": "Subscription Updated Successfully"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    # ==========================
    # DELETE SUBSCRIPTION
    # ==========================
    @app.route("/api/subscriptions/<int:id>", methods=["DELETE"])
    def delete_subscription(id):
        subscription = db.session.get(Subscription, id)
        if not subscription:
            return jsonify({"message": "Subscription Not Found"}), 404

        try:
            log = AuditLog(
                action="Deleted",
                subscriber_name=subscription.subscriber_name,
                created_at=datetime.now()
            )
            db.session.add(log)
            db.session.delete(subscription)
            db.session.commit()
            return jsonify({"message": "Subscription Deleted Successfully"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    # ==========================
    # DASHBOARD
    # ==========================
    @app.route("/api/dashboard", methods=["GET"])
    def dashboard():
        subscriptions = Subscription.query.all()

        for s in subscriptions:
            # Safer logic for expiration
            if s.payment_status == "Overdue":
                s.status = "Expired"
            
            # Check if trial has ended (treating trial_days as an int)
            if s.plan == "Trial" and (s.trial_days is not None and s.trial_days <= 0):
                s.status = "Expired"

        try:
            db.session.commit()
        except:
            db.session.rollback()

        return jsonify({
            "total": len(subscriptions),
            "active": len([s for s in subscriptions if s.status == "Active"]),
            "expired": len([s for s in subscriptions if s.status == "Expired"]),
            "trial": len([s for s in subscriptions if s.plan == "Trial"]),
            "total_revenue": sum(float(s.monthly_cost or 0) for s in subscriptions),
            "pending_payments": len([s for s in subscriptions if s.payment_status == "Pending"]),
            "renewals_soon": len([s for s in subscriptions if s.next_billing_date])
        })

    # ==========================
    # PAYMENTS & AUDIT
    # ==========================
    @app.route("/api/payments", methods=["GET"])
    def get_payments():
        payments = Payment.query.all()
        return jsonify([{
            "id": p.id,
            "subscriber_name": p.subscriber_name,
            "plan": p.plan,
            "amount": p.amount,
            "status": p.status,
            "payment_date": p.payment_date,
            "next_billing": p.next_billing
        } for p in payments])

    @app.route("/api/payments", methods=["POST"])
    def create_payment():
        data = request.get_json(silent=True) or {}
        try:
            payment = Payment(
                subscriber_name=data.get("subscriber_name"),
                plan=data.get("plan"),
                amount=data.get("amount"),
                status=data.get("status"),
                payment_date=data.get("payment_date"),
                next_billing=data.get("next_billing")
            )
            db.session.add(payment)
            db.session.commit()
            return jsonify({"message": "Payment Added"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    @app.route("/api/audit-logs", methods=["GET"])
    def get_audit_logs():
        logs = AuditLog.query.order_by(AuditLog.id.desc()).all()
        return jsonify([{
            "id": log.id,
            "action": log.action,
            "subscriber_name": log.subscriber_name,
            "created_at": str(log.created_at)
        } for log in logs])