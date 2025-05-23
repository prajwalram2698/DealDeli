Grocery Price Comparison Web App for Indian Students in the UK
Project Overview
This web app helps Indian students in the UK compare grocery prices across multiple UK-based stores to make informed, cost-effective purchasing decisions. It offers a user-friendly platform where students can search for groceries, view prices from different stores, and identify the best deals. The app also provides personalized recommendations and notifications about discounts and store promotions.

Key Features
Price Comparison: Compare grocery product prices across multiple UK-based stores in real-time.
Search & Filter: Search for grocery products by name, brand, price, or category.
Product Availability: View which stores have the product in stock, with real-time stock updates.
Discount Alerts: Receive notifications about discounts, sales, and promotions from various stores.
Store Reviews & Ratings: See reviews of stores based on user experiences to help make decisions.
Personalized Recommendations: Tailored suggestions based on purchase history, preferences, and budget.
Indian-Centric Grocery Items: Focus on Indian food products, brands, and ingredients typically sought by Indian students.

To run frontend microservice:
Using Docker CLI
Build your Docker image (from your frontend_microservice directory):


docker build -t frontend-microservice .

Run the container with port mapping:
docker run -d --name frontend-microservice -p 8080:8000 frontend-microservice

8080 is the port on your host (your computer).

8000 is the port your application listens to inside the container.

Now, you can access your frontend at http://localhost:8080.

To run user microservice:
1. Build the Docker Image
2. 
docker build -t user-microservice .

3. Run the Container
   
docker run -d --name user-microservice -p 5001:5001 user-microservice

The service will be available at http://localhost:5001.

Run both these scripts in seperate terminals and login to http://localhost:8080 to view the application.
