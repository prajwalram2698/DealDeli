# tests/test_price_microservice.py

import unittest
import json
from app import app

class PriceMicroserviceTest(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_root_status(self):
        # Test database connection check
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("status", data)
        self.assertEqual(data["status"], "connected")
        self.assertIn("total_products", data)

    def test_index_page(self):
        # Test if the index HTML page loads
        response = self.client.get("/index")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"<title>Product Search</title>", response.data)

    def test_compare_missing_name(self):
        # Should return error if no 'name' query param
        response = self.client.get("/compare")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Please provide a product name", response.get_data(as_text=True))

    def test_compare_valid_product(self):
        # Try searching for a product that exists in DB like "apple"
        response = self.client.get("/compare?name=apple")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        if data:  # if there is at least one product
            self.assertIn("name", data[0])
            self.assertIn("price", data[0])
            self.assertIn("image", data[0])
            self.assertIn("link", data[0])

if __name__ == "__main__":
    unittest.main()
