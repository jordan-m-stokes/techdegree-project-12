'use strict';

const mongoose = require('mongoose');

require('dotenv').config();

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/clarity-spanish', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//fields
const database = mongoose.connection;

//database setup
database.on('error', console.error.bind(console, 'connection error: '));

database.once("open", () => 
{
    console.log('opened connection to database');
});


//*************************//
// ENTER NEW AUTHOR INFO HERE
//*************************//

const newAuthor = 
{
    name: 'John Smith',
    email: 'johnsmith@clarityspanish.com',
    password: 'examplepass'
}

const Author = require('../models/author');

if(newAuthor.name && newAuthor.email && newAuthor.password)
{
    //creates and saves user
    Author.create(newAuthor, (error, author) => 
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log('Author created:\n\n', author);
        }
        database.close();
    });
}
else
{
    console.log('please provide "name", "email", and "password" in "newAuthor" object');
}