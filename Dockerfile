# Use Node LTS version with smaller footprint
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install -g expo-cli && npm install

# Copy project files
COPY . .

# Expose the default Expo port
EXPOSE 8081

# Start the Expo development server
CMD ["npm", "start"]
