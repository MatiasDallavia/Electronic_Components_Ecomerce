FROM node:18 as build

WORKDIR /react

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build