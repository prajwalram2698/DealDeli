# Use Python image
FROM python:3.13-slim

# Set work directory
WORKDIR /app

# Copy files
COPY . /app

# Install system dependencies (optional, helps avoid mysqlclient issues)
RUN apt-get update && apt-get install -y gcc default-libmysqlclient-dev

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
