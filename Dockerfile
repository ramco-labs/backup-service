ARG app_port
ARG debug_port
FROM node:11.11.0
WORKDIR /app/server
COPY package.json /app/server/package.json
RUN npm install -g typescript nodemon eslint
RUN npm install
RUN apt-get update && apt-get -y install rsync
COPY . /app/server
# RUN  ssh -o "StrictHostKeyChecking=no"
# RUN echo "StrictHostKeyChecking no\n" >> /root/.ssh/config
RUN npm run-script build
EXPOSE $app_port $debug_port 
CMD [ "npm", "start" ]