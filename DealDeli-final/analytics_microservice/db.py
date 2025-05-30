import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="host.docker.internal",
        user="root",
        password="Welcom_praj@123",
        database="dealdeli_data"
    )
