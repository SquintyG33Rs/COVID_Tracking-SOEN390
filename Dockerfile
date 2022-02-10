FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g @ionic/cli

COPY . .

ENV PORT=8100

EXPOSE 8100

CMD ["npm", "start"]
