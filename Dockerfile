# Use the official Node.js image as a base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /src

# Copy the package files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]