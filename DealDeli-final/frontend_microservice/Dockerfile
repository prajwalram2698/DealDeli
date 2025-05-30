# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy all frontend files to /app
COPY templates/ /app/

# Expose the port
EXPOSE 8000

# Use Python's built-in HTTP server
CMD ["python", "-m", "http.server", "8000"]
