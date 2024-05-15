FROM node:14

WORKDIR /src

COPY package*.json ./
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
