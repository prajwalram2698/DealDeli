from flask import Flask, jsonify, request
import json
import os

app = Flask(__name__)

# USE HELPER FUNCTION HERE

with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "aldi_data.json")) as file:
    aldi_data = json.load(file)

with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "asda_data.json")) as file:
    asda_data = json.load(file)

with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "sainsburys_data.json")) as file:
    sainsburys_data = json.load(file)

with open(os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "databases", "tesco_data.json")) as file:
    tesco_data = json.load(file)

# COMPRESS INTO SINGLE DYNAMIC ENDPOINT

@app.route("/tesco", methods=['GET'])
def tesco_list():
    return jsonify(tesco_data)

@app.route("/asda", methods=['GET'])
def asda_list():
    return jsonify(asda_data)

@app.route("/aldi", methods=['GET'])
def aldi_list():
    return jsonify(aldi_data)

@app.route("/sainsburys", methods=['GET'])
def sainsburys_list():
    return jsonify(sainsburys_data)


@app.route('/')
def index():
    return 'index'

stores = {
    "tesco": tesco_data,
    "aldi": aldi_data,
    "sainsburys": sainsburys_data,
    "asda": asda_data
}

@app.route('/<store>/<Product_id>', methods=['GET'])
def product_lookup(store, Product_id):
    store = store.lower()
    for product in stores[store]:
        if str(product.get("Product_id")) == str(Product_id):
            return jsonify(product)
    return jsonify({"error": "Product not found"}), 404
