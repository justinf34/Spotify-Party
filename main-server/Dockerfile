FROM node:12

WORKDIR /main-server

COPY package*.json ./

RUN npm install

COPY . .

# Can add ENV vars

EXPOSE 8889

CMD ["npm", "start"]