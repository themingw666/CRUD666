# Use Node.js LTS
FROM node:20-slim

# Setup working directory
WORKDIR /app

# Copy package files strictly for layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Install dumb-init strictly to handle PID 1 signals (like Ctrl+C SIGINT)
RUN apt-get update && apt-get install -y dumb-init --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy all source files
COPY . .

# Expose server port
EXPOSE 3000

# Use dumb-init to orchestrate processes
ENTRYPOINT ["dumb-init", "--"]

# Run the app
CMD ["node", "app.js"]