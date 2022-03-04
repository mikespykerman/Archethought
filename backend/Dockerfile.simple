FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 8090
CMD [ "node", "/app/api/app.js" ]
