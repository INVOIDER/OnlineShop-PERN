FROM node:18.15
WORKDIR ./client

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000
CMD ["npm","run","start"]