FROM node:14-alpine

WORKDIR /worker

# Copy package.json and install dependencies
COPY package.json .
RUN npm install --only=production

# Copy worker code
COPY worker.js .

CMD ["npm", "start"]
