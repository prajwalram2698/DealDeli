# first source venv/bin/activate
# flask --app app run

from flask import Flask, jsonify, request,render_template
import json
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.exc import OperationalError
from sqlalchemy import text

app = Flask(__name__)
CORS(app)

base_dir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(base_dir, '..', 'databases', 'products.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:UoS%402025@localhost/DealDeli_data"
db = SQLAlchemy(app)

@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/")
def db_check():
    try:
        result = db.session.execute(text("SELECT COUNT(*) FROM products"))
        count = result.fetchone()[0]
        return jsonify({"status": "connected", "total_products": count})
    except OperationalError as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/compare")
def compare_product():

    query_name = request.args.get("name")
    if not query_name:
        return jsonify({"error": "Please provide a product name using ?name="}), 400
    
    sql = text("""
        SELECT 
            `Product Name` AS name, 
            CAST(`Price in GBP` AS DECIMAL(10,2)) AS price, 
            `Category` AS category, 
            `Image URL` AS image, 
            `Product URL` AS link
        FROM products
        WHERE LOWER(`Product Name`) LIKE :pattern
        ORDER BY price ASC
    """)
    pattern = f"%{query_name.lower()}%"

    try:
        result = db.session.execute(sql, {"pattern": pattern})
        products = [dict(row._mapping) for row in result]
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(products)

if __name__ == "__main__":
    app.run()

# compare?name=apple

