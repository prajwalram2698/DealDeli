from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from model import User
from db import get_db_user_conection

routes = Blueprint('routes', __name__)

# Simple test route to check if Flask and blueprints are working
@routes.route('/hello', methods=['GET'])
def hello_route():
    return "Hello, flask is working!"

# ===============================
# User Registration Route
# ===============================
@routes.route('/register', methods=['POST'])
def register_user():
    json_payload = request.get_json()

    # Extract user input with unique variable names
    user_first_name = json_payload.get('first_name')
    user_last_name = json_payload.get('last_name')
    user_email_address = json_payload.get('email')
    user_password = json_payload.get('password')
    user_confirm_password = json_payload.get('confirm_password')

    # Ensure all fields are filled
    if not all([user_first_name, user_last_name, user_email_address, user_password, user_confirm_password]):
        return jsonify({"message": "All fields are required"}), 400

    # Check if passwords match
    if user_password != user_confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    database_connection = get_db_user_conection()
    db_cursor = database_connection.cursor()

    # Check if the email is already registered
    db_cursor.execute('SELECT * FROM users WHERE email = ?', (user_email_address,))
    existing_user_record = db_cursor.fetchone()

    if existing_user_record:
        database_connection.close()
        return jsonify({"message": "Email already registered"}), 400

    # Hash the password before saving
    hashed_user_password = generate_password_hash(user_password)

    # Insert new user into the database
    db_cursor.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        (user_first_name, user_last_name, user_email_address, hashed_user_password)
    )
    database_connection.commit()
    database_connection.close()

    return jsonify({"message": "User registered successfully"}), 201

# ===============================
# User Login Route
# ===============================
@routes.route('/login', methods=['POST'])
def login_user():
    json_payload = request.get_json()

    # Extract email and password from request
    login_email = json_payload.get('email')
    login_password = json_payload.get('password')

    if not login_email or not login_password:
        return jsonify({"message": "Email and password are required"}), 400

    database_connection = get_db_user_conection()
    db_cursor = database_connection.cursor()

    # Retrieve the user record by email
    db_cursor.execute('SELECT * FROM users WHERE email = ?', (login_email,))
    user_record = db_cursor.fetchone()
    database_connection.close()

    # Check if user exists and password matches the hashed version
    if not user_record or not check_password_hash(user_record['password'], login_password):
        return jsonify({"message": "Invalid email or password"}), 400

    return jsonify({"message": f"Welcome {user_record['first_name']} {user_record['last_name']}!"}), 200

# ===============================
# Password Reset Route
# ===============================
@routes.route('/reset-password', methods=['POST'])
def reset_user_password():
    json_payload = request.get_json()

    # Get user input
    reset_email = json_payload.get('email')
    reset_new_password = json_payload.get('new_password')
    reset_confirm_password = json_payload.get('confirm_password')

    # Validate required fields
    if not all([reset_email, reset_new_password, reset_confirm_password]):
        return jsonify({"message": "All fields are required"}), 400

    # Check if passwords match
    if reset_new_password != reset_confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    database_connection = get_db_user_conection()
    db_cursor = database_connection.cursor()

    # Check if the email exists in the database
    db_cursor.execute('SELECT * FROM users WHERE email = ?', (reset_email,))
    user_record = db_cursor.fetchone()

    if not user_record:
        database_connection.close()
        return jsonify({"message": "Email not found"}), 404

    # Hash the new password
    hashed_reset_password = generate_password_hash(reset_new_password)

    # Update the user's password in the database
    db_cursor.execute('UPDATE users SET password = ? WHERE email = ?', (hashed_reset_password, reset_email))
    database_connection.commit()
    database_connection.close()

    return jsonify({"message": "Password reset successfully"}), 200
