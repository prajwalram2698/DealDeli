from db import get_db_user_conection
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, id=None, first_name=None, last_name=None, email=None, password=None):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password  # This should be hashed

    @staticmethod
    def find_by_email(email):
        conn = get_db_user_conection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return User(id=row['id'], first_name=row['first_name'], last_name=row['last_name'], email=row['email'], password=row['password'])
        return None

    def save_to_db(self):
        conn = get_db_user_conection()
        cursor = conn.cursor()
        if self.id:  # Update existing user
            cursor.execute('UPDATE users SET first_name=?, last_name=?, email=?, password=? WHERE id=?',
                           (self.first_name, self.last_name, self.email, self.password, self.id))
        else:  # Insert new user
            cursor.execute('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
                           (self.first_name, self.last_name, self.email, self.password))
            self.id = cursor.lastrowid
        conn.commit()
        conn.close()

    def check_password(self, password_plain):
        return check_password_hash(self.password, password_plain)

    def set_password(self, password_plain):
        self.password = generate_password_hash(password_plain)
