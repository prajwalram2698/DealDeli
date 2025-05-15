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
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
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
            name, 
            price, 
            category, 
            image_url AS image, 
            url AS link
        FROM products
        WHERE LOWER(name) LIKE :pattern
        ORDER BY price ASC
    """)
    pattern = f"%{query_name.lower()}%"

    try:
        result = db.session.execute(sql, {"pattern": pattern})
        products = [dict(row._mapping) for row in result]
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(products)

# compare?name=apple

# @app.route("/products")
# def get_all_products():
#     try:
#         sql = text("""
#             SELECT 
#                 name, 
#                 price, 
#                 category, 
#                 image_url AS image, 
#                 url AS link
#             FROM products
#             ORDER BY name ASC
#         """)
#         result = db.session.execute(sql)
#         products = [dict(row._mapping) for row in result]
#         return jsonify(products)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # USE HELPER FUNCTION HERE

# with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "aldi_data.json")) as file:
#     aldi_data = json.load(file)

# with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "asda_data.json")) as file:
#     asda_data = json.load(file)

# with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "sainsburys_data.json")) as file:
#     sainsburys_data = json.load(file)

# with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "tesco_data.json")) as file:
#     tesco_data = json.load(file)

# # COMPRESS INTO SINGLE DYNAMIC ENDPOINT

# @app.route("/tesco", methods=['GET'])
# def tesco_list():
#     return jsonify(tesco_data)

# @app.route("/asda", methods=['GET'])
# def asda_list():
#     return jsonify(asda_data)

# @app.route("/aldi", methods=['GET'])
# def aldi_list():
#     return jsonify(aldi_data)

# @app.route("/sainsburys", methods=['GET'])
# def sainsburys_list():
#     return jsonify(sainsburys_data)


# @app.route('/')
# def index():
#     return 'index'

# stores = {
#     "tesco": tesco_data,
#     "aldi": aldi_data,
#     "sainsburys": sainsburys_data,
#     "asda": asda_data
# }

# @app.route('/<store>/<Product_id>', methods=['GET'])
# def product_lookup(store, Product_id):
#     store = store.lower()
#     for product in stores[store]:
#         if str(product.get("Product_id")) == str(Product_id):
#             return jsonify(product)
#     return jsonify({"error": "Product not found"}), 404
