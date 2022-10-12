
FROM node:16.15-alpine3.14

RUN mkdir -p /home/app
WORKDIR /home/app

# add new user
RUN adduser -S ramzi

# isntall nano
RUN apk update
RUN apk add nano

# copy project
COPY . .

# install dependencies node_modules
RUN yarn --network-timeout 100000

RUN chown -R ramzi /home/app
USER ramzi

#EXPOSE 3000
#CMD ["yarn" , "pm2:start"]
