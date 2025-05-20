# first venv\Scripts\activate
# then python app.py and go to this url: http://127.0.0.1:5003/dashboard

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from db import get_connection
from routes.analytics_routes import analytics_routes

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Linking the analytics-related endpoints from a separate file
app.register_blueprint(analytics_routes)

# Route to load the Analytics Dashboard UI
@app.route("/dashboard")
def show_dashboard():
    return render_template("dashboard.html")

# Route to search and compare products across all stores
@app.route("/products/compare/<product_name>")
def search_product_prices(product_name):
    try:
        # Step 1: Connect to the database
        db_connection = get_connection()
        db_cursor = db_connection.cursor(dictionary=True)

        # Step 2: Query to search products using partial matching
        product_match_query = """
            SELECT 'Aldi' AS store_name, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL`
            FROM aldi_data
            WHERE LOWER(`Product Name`) LIKE LOWER(%s)

            UNION

            SELECT 'Asda' AS store_name, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL`
            FROM asda_data
            WHERE LOWER(`Product Name`) LIKE LOWER(%s)

            UNION

            SELECT 'Tesco' AS store_name, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL`
            FROM tesco_data
            WHERE LOWER(`Product Name`) LIKE LOWER(%s)

            UNION

            SELECT 'Sainsburys' AS store_name, `Product Name`, `Price in GBP`, `Category`, `Quantity/Package_size`, `Product URL`, `Image URL`
            FROM sainsburys_data
            WHERE LOWER(`Product Name`) LIKE LOWER(%s)
        """

        # Step 3: Preparing the user search pattern
        search_pattern = f"%{product_name}%"

        # Step 4: Execute the query with same pattern for all stores
        db_cursor.execute(product_match_query, (search_pattern, search_pattern, search_pattern, search_pattern))
        search_results = db_cursor.fetchall()

        # Step 5: Close connections
        db_cursor.close()
        db_connection.close()

        # Step 6: Send the results back
        return jsonify(search_results), 200

    except Exception as error_message:
        # If anything goes wrong, send the error back nicely
        return jsonify({"error": str(error_message)}), 500

if __name__ == "__main__":
    app.run(port=5003, debug=True)
