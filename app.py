from flask import Flask
from db import init_db
from routes import routes

app = Flask(__name__)

# Initialize DB
init_db()

# Register Routes
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True)
