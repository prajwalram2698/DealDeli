# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy your static files (HTML, JS, CSS, images, etc.) into the Nginx web root
COPY . /usr/share/nginx/html

# Expose port 80 (the default for Nginx)
EXPOSE 80

# Start Nginx (CMD is already set by the base image)
