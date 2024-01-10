FROM node:17

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install nodemon -g

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000  

CMD ["npm", "run", "devStart"]