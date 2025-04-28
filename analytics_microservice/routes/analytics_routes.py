from flask import Blueprint, request, jsonify
from db import get_connection   

# Define a Blueprint
analytics_routes = Blueprint('analytics', __name__)

# Route to log a product search
@analytics_routes.route("/analytics/log_search", methods=["POST"])
def log_search():
    data = request.json
    product = data.get("product_name")
    email = data.get("user_email")

    cnct = get_connection()
    cursor = cnct.cursor()
    cursor.execute("INSERT INTO search_logs (user_email, product_name) VALUES (%s, %s)", (email, product))
    cnct.commit()
    cursor.close()
    cnct.close()

    return jsonify({"message": "Search logged"})

#Route to get total searches
@analytics_routes.route("/analytics/total_searches", methods=["GET"])
def total_searches():
    cnct = get_connection()
    cursor = cnct.cursor(dictionary=True)
    cursor.execute("SELECT COUNT(*) AS total_searches FROM search_logs")
    result = cursor.fetchone()
    cursor.close()
    cnct.close()

    return jsonify(result)

#Route to get recent 10 searches
@analytics_routes.route("/analytics/recent_searches", methods=["GET"])
def recent_searches():
    cnct = get_connection()
    cursor = cnct.cursor(dictionary=True)
    cursor.execute("""
        SELECT product_name, timestamp
        FROM search_logs
        ORDER BY timestamp DESC
        LIMIT 10
    """)
    results = cursor.fetchall()
    cursor.close()
    cnct.close()

    return jsonify(results)

# Corrected category_distribution route
@analytics_routes.route("/analytics/category_distribution", methods=["GET"])
def category_distribution():
    try:
        cnct = get_connection() 
        cursor = cnct.cursor(dictionary=True)
        query = """
            SELECT category, COUNT(*) AS search_count
            FROM (
                SELECT 
                    COALESCE(a.Category, b.Category, c.Category, d.Category) AS category
                FROM search_logs AS sl
                LEFT JOIN aldi_data AS a ON sl.product_name = a.`Product Name`
                LEFT JOIN asda_data AS b ON sl.product_name = b.`Product Name`
                LEFT JOIN tesco_data AS c ON sl.product_name = c.`Product Name`
                LEFT JOIN sainsburys_data AS d ON sl.product_name = d.`Product Name`
            ) AS combined
            WHERE category IS NOT NULL
            GROUP BY category
            ORDER BY search_count DESC
        """
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        cnct.close()

        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




