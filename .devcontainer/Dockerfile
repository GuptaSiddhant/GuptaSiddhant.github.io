FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-14

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive &&
    apt-get install git yarn

WORKDIR /usr/server/app

COPY ./package.json ./
RUN yarn

COPY ./ .

# RUN yarn build
# ENV NODE_ENV=production

# CMD ["yarn", "start"]
