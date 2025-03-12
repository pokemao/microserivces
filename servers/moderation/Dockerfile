FROM node:18-alpine

WORKDIR /app
COPY package.json ./
COPY ./dist/cjs .

CMD ["npm", "start"]
