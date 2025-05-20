# Start from the official lightweight Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy requirements.txt first (create this file with dependencies)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app code
COPY . .

# Expose port 5000 (Flask default)
EXPOSE 5000


# Set environment variables so Flask runs on 0.0.0.0 and knows the app file
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=app.py

# Run Flask development server (replace with gunicorn for production)
CMD ["flask", "run"]
