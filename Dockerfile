FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install
#RUN npm install -g @ionic/cli
#RUN npm install -g @angular/cli

COPY . .

ENV PORT=4200

EXPOSE 4200

CMD ["npm", "run", "docker-start"]