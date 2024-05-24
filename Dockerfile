FROM node:14

WORKDIR /src

COPY package*.json ./
RUN npm install
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "start"]
