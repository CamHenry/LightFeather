# Full Stack Technical Challenge Submission

Cameron Henry's submission for the Full Stack Technical Challenge for LightFeather.io

## Installation 

This project requires the installation of node.js. You can install node.js from (https://nodejs.org/en/download/).

This project is dockerized and meant to be run through Docker. Please follow this [link](https://docs.docker.com/get-docker/) to get your installation package for Docker. Docker must be installed and running for the docker-compose commands to run. 

## Getting Started

After extracting this project to your workspace, cd into the workspace and run the commands:
```
docker-compose build
docker-compose up
```

This should run 'npm install' for any dependencies the client and api will need. It will then boot up the the api on http://localhost:8080 and the client on http://localhost:3000 using the commands 'npm run dev' and 'npm start' respectively.

Access http://localhost:3000 on your preferred browser to view the client landing page.