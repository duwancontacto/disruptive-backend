
FROM node:18.17.0 

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3001


CMD ["npm", "run", "start"]


