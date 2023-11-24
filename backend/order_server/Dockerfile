FROM node:17

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install nodemon -g

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001  

CMD ["npm", "run", "devStart"]