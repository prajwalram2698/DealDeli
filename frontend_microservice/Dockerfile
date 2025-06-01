# Use a lightweight web server image
FROM nginx:alpine

# Remove default nginx page and copy your HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy static files into nginx's served directory
COPY templates/index.html /usr/share/nginx/html/

# Expose port 80 to the host
EXPOSE 80

# Start nginx (automatically happens via base image CMD)
