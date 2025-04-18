# Build stage
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy built node modules and compiled sources
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app ./

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"] 