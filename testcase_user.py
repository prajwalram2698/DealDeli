import pytest
from flask import Flask
from routes import routes

@pytest.fixture
def client(mocker):
    # Minimal Flask app for testing
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.register_blueprint(routes)
    with app.test_client() as client:
        yield client

def test_register_duplicate_email(client, mocker):
    """
    Should prevent registration with an email that's already registered.
    """
    mocker.patch('model.User.find_by_email', return_value=True)
    response = client.post('/register', json={
        "first_name": "Raj",
        "last_name": "Singh",
        "email": "raj@example.com",
        "password": "pass1234",
        "confirm_password": "pass1234"
    })
    assert response.status_code == 400
    assert b"Email already registered" in response.data

def test_login_unregistered_user(client, mocker):
    """
    Should not allow login with an unregistered email.
    """
    mocker.patch('model.User.find_by_email', return_value=None)
    response = client.post('/login', json={
        "email": "notfound@example.com",
        "password": "somepassword"
    })
    assert response.status_code == 400
    assert b"Invalid email or password" in response.data

def test_register_missing_fields(client):
    """
    Should reject registration if any required field is missing.
    """
    response = client.post('/register', json={
        "first_name": "Sam"
        # Missing last_name, email, password, confirm_password
    })
    assert response.status_code == 400
    assert b"All fields are required" in response.data

def test_register_password_mismatch(client, mocker):
    """
    Should reject registration if passwords do not match.
    """
    mocker.patch('model.User.find_by_email', return_value=None)
    response = client.post('/register', json={
        "first_name": "Mismatch",
        "last_name": "User",
        "email": "mismatch@example.com",
        "password": "abc12345",
        "confirm_password": "abc123"
    })
    assert response.status_code == 400
    assert b"Passwords do not match" in response.data
