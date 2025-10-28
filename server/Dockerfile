# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files and install packages
COPY package*.json ./
RUN npm install --production

# Copy the rest of your backend files
COPY . .

# Expose backend port
EXPOSE 4000

# Set environment variables (if any are critical, not sensitive)
# These can also be passed dynamically via docker run --env-file .env
ENV NODE_ENV=production

# Start the backend server
CMD ["node", "server.js"]
