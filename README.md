This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Info
This app is a MERN-stack application. It has a back-end, Express server and front-end, React server. It's purpose is to serve as a blogging site. The back-end is used to publish, edit and delete blog posts, and the front-end is for viewing them. To create a post, on the back-end, simply click "Create New Post," fill out form, search for a cover photo from Pexels or Unsplash with built-in search engine, and submit it. After that, the post can be viewed on the front-end.

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
* Backend requires a username and password to manage posts. In order to create a user, navigate to `/backend/db-scripts/add-author.js` and edit `newAuthor` object to choose a name, password, and email to add. IN ORDER TO ACTUALLY ADD USER, run the script `npm run add-author`. The purpose of this complex process is to ensure that nobody can hack their way onto the site except by directly editting this `.js` file.
* This project uses [Concurrently](https://www.npmjs.com/package/concurrently) as a dependency to run front and backend, so simply type `npm start` to run front and backend
* That's it! Backend by default will be at `http://localhost:5000` and frontend at `http://localhost:3000`
