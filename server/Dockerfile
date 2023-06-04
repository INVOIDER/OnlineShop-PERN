FROM node:18.15
WORKDIR ./server

COPY package*.json ./

RUN npm ci

COPY . .
EXPOSE 5000
EXPOSE 5432
EXPOSE 5050

CMD ["npm","run","start"]