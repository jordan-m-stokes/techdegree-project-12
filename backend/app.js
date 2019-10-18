'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clarity-spanish', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//fields
const database = mongoose.connection;
const port = process.env.PORT || 5000;
const app = express();

//route imports 
const indexRoute = require('./routes');
const postsRoute = require('./routes/posts');
const imageSearchRoute = require('./routes/image-search');

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
app.use(session({
	secret: 'algo que nadie se vaya a enterar',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: database
	})

}))

//my middleware
app.use((request, response, next) => 
{
	//makes accesible database and environment variables to entire program.
	request.database = database;
	request.environment = process.env;
	request.adminUrl = process.env.ADMIN_URL || 'http://localhost:5000';

	next();
});

//static files
app.use('/static', express.static('backend/public'));

// route usage
app.use('/', indexRoute);
app.use('/posts', postsRoute);
app.use('/image-search', imageSearchRoute);

// send 404 if no other route matched
app.use((request, response) =>
{
	response.status(404);
	response.render('error/not-found');
});

// global error handler
app.use((error, request, response, next) =>
{
	if(!error.status)
	{
		error.status = 500;
	}
	console.log(error);

	response.locals.error = error;
	response.render('./error/server-error');
});

// start listening on our port
const server = app.listen(app.get('port'), () =>
{
  	console.log(`started server on port ${server.address().port}`);
});