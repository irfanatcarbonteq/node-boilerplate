#https://itnext.io/dockerize-a-node-js-app-connected-to-mongodb-64fdeca94797 
FROM node:12
# Create app directory
WORKDIR /usr/src/App
# Install app dependencies
COPY package.json ./
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
CMD [ "npm", "start" ]