FROM node:12

WORKDIR /auth-server

COPY package*.json ./

RUN npm install

COPY . .

# Can add ENV vars

EXPOSE 8888

CMD ["npm", "start"]