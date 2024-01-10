FROM node:17

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install nodemon -g

RUN npm install

COPY . .

ENV PORT=7000

EXPOSE 7000  

CMD ["npm", "run", "devStart"]