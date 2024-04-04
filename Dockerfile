FROM node:18.0.0-alpine as build

WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]

RUN rm -rf yarn.lock node_modules
RUN yarn install
COPY . .
RUN yarn migrate
RUN yarn seed
RUN yarn build

FROM node:17.0.0-alpine as main
WORKDIR /app

COPY --from=build [ "/app/node_modules", "./node_modules" ]
COPY --from=build ["/app/package.json", "/app/yarn.lock", "/app/.env", "/app/.sequelizerc", "./"]
COPY --from=build /app/build ./build

EXPOSE 4000 4005

CMD [ "yarn", "start" ]
