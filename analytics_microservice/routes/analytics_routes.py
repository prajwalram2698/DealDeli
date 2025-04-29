# routes/analytics_routes.py

from flask import Blueprint, request, jsonify
from db import get_connection

analytics_routes = Blueprint('analytics', __name__)

# POST - Log a product search
@analytics_routes.route("/analytics/log_search", methods=["POST"])
def log_search():
    search_data = request.json
    product_name = search_data.get("product_name")
    user_email = search_data.get("user_email")

    db_link = get_connection()
    db_cursor = db_link.cursor()
    db_cursor.execute(
        "INSERT INTO search_logs (user_email, product_name) VALUES (%s, %s)",
        (user_email, product_name)
    )
    db_link.commit()
    db_cursor.close()
    db_link.close()

    return jsonify({"message": "Search logged successfully"})

# GET - Total searches
@analytics_routes.route("/analytics/total_searches")
def total_searches():
    db_link = get_connection()
    db_cursor = db_link.cursor(dictionary=True)
    db_cursor.execute("SELECT COUNT(*) AS total_searches FROM search_logs")
    result = db_cursor.fetchone()
    db_cursor.close()
    db_link.close()
    return jsonify(result)

# GET - Recent Searches
@analytics_routes.route("/analytics/recent_searches")
def recent_searches():
    db_link = get_connection()
    db_cursor = db_link.cursor(dictionary=True)
    db_cursor.execute("""
        SELECT product_name, timestamp
        FROM search_logs
        ORDER BY timestamp DESC
        LIMIT 10
    """)
    searches = db_cursor.fetchall()
    db_cursor.close()
    db_link.close()
    return jsonify(searches)

# GET - Top Viewed Products
@analytics_routes.route("/analytics/top_viewed_products")
def top_viewed_products():
    db_link = get_connection()
    db_cursor = db_link.cursor(dictionary=True)
    db_cursor.execute("""
        SELECT product_name, COUNT(*) AS count
        FROM search_logs
        GROUP BY product_name
        ORDER BY count DESC
        LIMIT 5
    """)
    popular_products = db_cursor.fetchall()
    db_cursor.close()
    db_link.close()
    return jsonify(popular_products)

# GET - Top Products Chart
@analytics_routes.route("/analytics/top_products_chart")
def top_products_chart():
    db_link = get_connection()
    db_cursor = db_link.cursor(dictionary=True)
    db_cursor.execute("""
        SELECT product_name, COUNT(*) AS count
        FROM search_logs
        GROUP BY product_name
        ORDER BY count DESC
        LIMIT 5
    """)
    chart_data = db_cursor.fetchall()
    db_cursor.close()
    db_link.close()
    return jsonify(chart_data)

# GET - Category Distribution
@analytics_routes.route("/analytics/category_distribution")
def category_distribution():
    db_link = get_connection()
    db_cursor = db_link.cursor(dictionary=True)

    db_cursor.execute("SELECT Category FROM products")
    all_categories = db_cursor.fetchall()

    category_count = {}
    for row in all_categories:
        category = row["Category"]
        if category:
            category_count[category] = category_count.get(category, 0) + 1

    db_cursor.close()
    db_link.close()

    final_result = [{"category": name, "count": count} for name, count in category_count.items()]
    return jsonify(final_result)
