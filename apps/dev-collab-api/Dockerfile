ARG NODE_VERSION="20.17.0"

FROM node:${NODE_VERSION}

COPY  . .

RUN npm i

CMD ["npm", "run", "start:prod"]