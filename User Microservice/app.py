import sqlite3
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token

# Initialize Flask app and JWTManager
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'Dealdeli@123'  # Replace with your actual secret key
jwt = JWTManager(app)

# SQLite database connection function
def get_db_connection():
    db_connection = sqlite3.connect('users.db')  # Changed variable name from 'conn' to 'db_connection'
    db_connection.row_factory = sqlite3.Row  # Allows for dictionary-like rows
    return db_connection

# Registration Endpoint - User signs up
@app.route('/registration', methods=['POST'])
def registration():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    # Check if passwords match
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match!"}), 400

    # Ensure all fields are provided
    if not all([first_name, last_name, email, password]):
        return jsonify({"message": "Please fill in all fields!"}), 400

    # Check if email already exists
    db_connection = get_db_connection()  # Use the new variable 'db_connection'
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        db_connection.close()  # Close the database connection
        return jsonify({"message": "User already exists!"}), 400

    # Insert new user into database (password is stored as plain text)
    cursor.execute(
        "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
        (first_name, last_name, email, password)  # Plain-text password (not hashed)
    )
    db_connection.commit()  # Commit the changes
    db_connection.close()  # Close the database connection

    return jsonify({"message": "User registered successfully!"}), 201

# Login Endpoint - User logs in and gets a JWT token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        return jsonify({"message": "Email and password are required!"}), 400

    # Check if user exists
    db_connection = get_db_connection()  # Use the new variable 'db_connection'
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    db_connection.close()  # Close the database connection

    if user and user['password'] == password:  # Plain-text password check
        # Create JWT token (email used as identity)
        access_token = create_access_token(identity=email)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"message": "Invalid credentials!"}), 401

if __name__ == '__main__':
    app.run(debug=True)
