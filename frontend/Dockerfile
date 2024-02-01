# FROM node:21.5
# WORKDIR /app
# COPY package*.json .
# COPY yarn*.lock .
# RUN yarn install
# COPY . .
# RUN yarn build

# Fetching the latest node image on alpine linux
FROM node:21.5

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /usr/src/frontend

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying all the files in our project
COPY . .


EXPOSE 3000

# Starting our application
CMD ["npm", "start"]