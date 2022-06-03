# Choose node runtime version
FROM node:14.7

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 40031
CMD [ "node", "index.js" ]