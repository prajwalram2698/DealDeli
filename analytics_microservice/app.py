from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from db import get_connection
from routes.analytics_routes import analytics_routes

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

app.register_blueprint(analytics_routes)

# Route to serve dashboard
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

# 🔥 Your New Compare Products Route Here:
@app.route("/products/compare/<product_name>")
def compare_prices(product_name):
    cnct = get_connection()
    cursor = cnct.cursor(dictionary=True)

    query = """
    SELECT 'aldi' AS store, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL` FROM aldi_data WHERE LOWER(`Product Name`) LIKE LOWER(%s)
    UNION
    SELECT 'asda' AS store, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL` FROM asda_data WHERE LOWER(`Product Name`) LIKE LOWER(%s)
    UNION
    SELECT 'tesco' AS store, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL` FROM tesco_data WHERE LOWER(`Product Name`) LIKE LOWER(%s)
    UNION
    SELECT 'sainsburys' AS store, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL` FROM sainsburys_data WHERE LOWER(`Product Name`) LIKE LOWER(%s)
"""

    like_pattern = f"%{product_name}%"
    cursor.execute(query, (like_pattern, like_pattern, like_pattern, like_pattern))
    results = cursor.fetchall()
    cursor.close()
    cnct.close()
    return jsonify(results)

if __name__ == "__main__":
    app.run(port=5003, debug=True)
