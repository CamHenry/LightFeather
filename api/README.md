# Overview
This template provides a very basic NodeJS Express application. This is intended to provide a bare minimum set of files that is executable, and can be compiled into a functional docker image.

# Running locally
Install NodeJS. Binaries are found on the NodeJS main site.
https://nodejs.org/en/download/

For MacOS and Linux, your package manager may already provide NodeJS. You may choose to use that method for installation.
https://nodejs.org/en/download/package-manager/

With NodeJS installed, install the dependencies for this project. This install command only needs to be run once.
```
npm install
```

Then start the API server.
```
npm run dev
```
Note: Due to structure changes from switching to Typescript and dockerizing, /api/ is currently only stable booting with 'npm run dev' as opposed to 'npm start' as would be normal.

This API server provides two endpoints:
1. GET /supervisors
2. POST /submit

# Running with docker
To help ensure consistently correct startup across multiple platforms, you may choose to use Docker to containerize your application.  Installation steps for docker can be found on their main page.
https://docs.docker.com/engine/install/

With Docker installed, you can build your a new image. This build needs to be run after any changes are made to the source code.
```
docker build . -t test:latest
```

After the image builds successfully, run a container from that image.
```
docker run -d --name test -p 8080:8080 test:latest
```

This server will bind to port 8080, and respond to the same `curl` examples listed above.

When you are done testing, stop the server and remove the container.
```
docker rm -f test
```

#Note this api was built in conjuction with a /client/. see the root nodes README.md for instructions on how to run this project with Docker.