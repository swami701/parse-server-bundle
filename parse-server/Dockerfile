FROM node:boron

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN apt-get update && apt-get install apt-transport-https -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn && yarn

CMD [ "npm", "start" ]
