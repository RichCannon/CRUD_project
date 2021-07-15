FROM node:14-slim

WORKDIR /usr/server

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "server" ]