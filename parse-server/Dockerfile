FROM node:boron

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

CMD [ "npm", "start" ]
