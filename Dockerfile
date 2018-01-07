FROM node:4

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install -g gulp-cli && npm install
RUN npm run build && npm run dist
