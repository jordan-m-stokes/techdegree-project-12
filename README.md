This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Info
This app is a MERN-stack application. It has a back-end, Express server and front-end, React server. It's purpose is to serve as a blogging site. The back-end is used to publish, edit and delete blog posts, and the front-end is for viewing them.

## Prerequisites

* [Mongo](https://www.mongodb.com/download-center/community)
* [NPM and NodeJS](https://www.npmjs.com/get-npm)
* An API key from [Pexels](https://www.pexels.com/api/)
* An API key from [Unsplash](https://unsplash.com/developers)

## Setup

* Startup Mongo server on local machine
* Clone this project to your PC
* Run `npm install` in project directory in order to install dependencies
* Create `.env` file in project directory and add api keys:
	```
	API_KEY_PEXELS=...
	API_KEY_UNSPLASH=...
	```
* This project uses [Concurrently](https://www.npmjs.com/package/concurrently) as a dependency to run front and backend, so simply type `npm start` to run front and backend
* That's it! Backend by default will be at `http://localhost:5000` and frontend at `http://localhost:3000`
