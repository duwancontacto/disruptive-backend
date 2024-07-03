
FROM node:18.17.0 

WORKDIR /app

COPY . .


RUN npm i
RUN npm install -g npm@latest

ENV PORT=3001
EXPOSE 3001


CMD ["npm", "run", "dev"]


