import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="UoS@2025",
        database="DealDeli_data"
    )
