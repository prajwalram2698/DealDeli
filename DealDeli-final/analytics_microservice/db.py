import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="local",
        user="root",
        password="Welcom_praj@123",
        database="dealdeli_data"
    )
