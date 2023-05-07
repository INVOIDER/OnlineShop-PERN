FROM node:18.15 
WORKDIR /onlineshop

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000
EXPOSE 5432
EXPOSE 5050

CMD ["npm","run","dev"]