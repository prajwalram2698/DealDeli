import sqlite3
import logging

DATABASE = 'users.db'

def init_db():
    user_con = sqlite3.connect(DATABASE)
    cursor = user_con.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    user_con.commit()
    user_con.close()

def get_db_user_conection():
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        logging.error(f"Database connection failed: {e}")
        return None
