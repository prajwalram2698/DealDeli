from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from model import User

routes = Blueprint('routes', __name__)

@routes.route('/hello', methods=['GET'])
def hello_route():
    return "Hello, flask is working!"

# ===============================
# User Registration Route
# ===============================
@routes.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    # Basic validation
    if not all([first_name, last_name, email, password, confirm_password]):
        return jsonify({"message": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    # Check if user exists
    if User.find_by_email(email):
        return jsonify({"message": "Email already registered"}), 400

    # Create and save user
    hashed_password = generate_password_hash(password)
    user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
    user.save_to_db()

    return jsonify({"message": "User registered successfully"}), 201

# ===============================
# User Login Route
# ===============================
@routes.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.find_by_email(email)
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid email or password"}), 400

    return jsonify({"message": f"Welcome {user.first_name} {user.last_name}!"}), 200

# ===============================
# Password Reset Route
# ===============================
@routes.route('/reset-password', methods=['POST'])
def reset_user_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not all([email, new_password, confirm_password]):
        return jsonify({"message": "All fields are required"}), 400

    if new_password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    user = User.find_by_email(email)
    if not user:
        return jsonify({"message": "Email not found"}), 404

    user.password = generate_password_hash(new_password)
    user.save_to_db()

    return jsonify({"message": "Password reset successfully"}), 200
