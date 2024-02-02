FROM node:21.5-alpine

WORKDIR /usr/src/frontend

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]