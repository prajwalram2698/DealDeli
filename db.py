import sqlite3

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
    user_con = sqlite3.user_conect(DATABASE)
    user_con.row_factory = sqlite3.Row
    return user_con