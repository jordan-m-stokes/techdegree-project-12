'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/clarity-spanish', { useNewUrlParser: true, useCreateIndex: true });

//fields
const database = mongoose.connection;
const port = process.env.PORT || 5000;
const app = express();

//route imports 
const indexRoute = require('./routes');
const postsRoute = require('./routes/posts');

//database setup
database.on('error', console.error.bind(console, 'connection error: '));

database.once("open", () => 
{
    console.log('opened connection to database');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));


// set our port
app.set('port', port);

//third-party middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//my middleware
app.use((request, response, next) => 
{
	request.database = database;
	next();
});

//static files
app.use('/static', express.static('backend/public'));

// route usage
app.use('/', indexRoute);
app.use('/posts', postsRoute);

// send 404 if no other route matched
app.use((request, response) =>
{
	response.status(404).json({
		message: 'Route Not Found'
	});
});

// global error handler
app.use((error, request, response, next) =>
{
	console.error(error.stack);

	response.status(error.status || 500).json({
		message: error.message,
		error: {}
	});
});

// start listening on our port
const server = app.listen(app.get('port'), () =>
{
  	console.log(`started server on port ${server.address().port}`);
});