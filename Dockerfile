FROM node:12-alpine

WORKDIR '/app'

COPY package.json package-lock.json ./

RUN apk --no-cache add git 

RUN npm ci

COPY . ./

CMD ["npm", "start"]
