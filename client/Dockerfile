FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --force && npm install -g @angular/cli --force

CMD ["ng","s","--host","0.0.0.0","--port","4200"]

EXPOSE 4200
