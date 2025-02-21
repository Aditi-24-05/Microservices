FROM node:14-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install --only=production

# Copy application code
COPY index.js .

EXPOSE 8081

CMD ["npm", "start"]
