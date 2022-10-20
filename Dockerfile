
FROM node:16.15-alpine3.14

WORKDIR /usr/app

# isntall nano
RUN apk update
RUN apk add nano

# install dependencies node_modules
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --network-timeout 100000

#EXPOSE 3000
#CMD ["yarn" , "pm2:start"]
