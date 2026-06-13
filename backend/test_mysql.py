import pymysql

conn = pymysql.connect(
    host="localhost",
    user="root",
    password="root123",
    database="subscription_manager"
)

print("Connected successfully!")

conn.close()