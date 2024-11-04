ARG NODE_VERSION="latest"

FROM node:${NODE_VERSION}

COPY  . .

RUN npm ci

CMD ["npm", "run", "start:prod"]