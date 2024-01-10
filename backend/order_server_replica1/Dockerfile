FROM node:17

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install nodemon -g

RUN npm install

COPY . .

ENV PORT=6001

EXPOSE 6001  

CMD ["npm", "run", "devStart"]