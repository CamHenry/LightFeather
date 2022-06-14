# pull official base image
FROM node:14.16.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]   