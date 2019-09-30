'use strict';

const mongoose = require('mongoose');

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/clarity-spanish', { useNewUrlParser: true, useCreateIndex: true });

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
    name: '',
    email: '',
    password: ''
}

const Author = require('./models/author');

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
            console.log(author);
        }
        database.close();
    });
}
else
{
    console.log('please provide "name", "email", and "password" in "newAuthor" object');
}