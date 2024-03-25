# Common build stage
FROM node:lts-alpine

COPY . ./app

WORKDIR /app

RUN yarn install --force

EXPOSE 3000

ENV NODE_ENV development

CMD ["npm", "run", "dev"]