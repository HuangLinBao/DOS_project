FROM node:17

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install nodemon -g

RUN npm install

COPY . .

ENV PORT=4001

EXPOSE 4001  

CMD ["npm", "run", "devStart"]