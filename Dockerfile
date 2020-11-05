# Base image
FROM node:latest

# Set working directory
RUN mkdir /app
WORKDIR /app

COPY . .

# Expose container port
EXPOSE 8080

# Install and cache app dependencies
RUN npm install --silent

RUN npm run-script build

CMD ["npm", "run", "start:prod"]
