# FROM node:alpine
# EXPOSE 8080
# WORKDIR /home/node
# COPY package.json .
# RUN npm install
# COPY . .
# RUN ts-node ./index.ts
# ENTRYPOINT ["node", "index.ts"]
# pull official base image
FROM node:14.16.0-alpine

# set working directory
WORKDIR /api

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]