FROM node:14

WORKDIR /usr/app

RUN rm -rf node_modules/

COPY ./package.json .

RUN yarn

COPY . .

EXPOSE 5555

CMD ["yarn", "dev"]