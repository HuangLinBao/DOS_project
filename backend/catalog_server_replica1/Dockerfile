FROM node:17

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install nodemon -g

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000  

CMD ["npm", "run", "devStart"]