# pull official base image
FROM node:current-alpine

# set working directory
WORKDIR /app
#COPY . .
RUN yarn install --silent
EXPOSE 3000
CMD ["yarn", "start"]
