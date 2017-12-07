FROM node:latest

# Create app directory
RUN mkdir parse-dashboard

ADD . /parse-dashboard
WORKDIR /parse-dashboard
RUN npm install

CMD [ "npm", "start" ]
