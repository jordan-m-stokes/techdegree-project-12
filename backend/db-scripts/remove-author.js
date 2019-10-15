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


//**************************************//
// ENTER THE AUTHOR TO REMOVE'S EMAIL HERE
//**************************************//

const email = 'johnsmith@clarityspanish.com';



const Author = require('../models/author');

if(email)
{
    //creates and saves user
    Author.find({ email: email })
		.exec((error, authors) => 
		{
			if(error || authors.length === 0)
			{
                console.log('provided email was not found in the database');
                database.close();
            }
            else
            {
                authors.forEach(author => 
                {
                    const name = author.name;

                    author.remove((error) => 
	                {
                        if(error)
                        {
                            console.log(`${name} was found but the database threw an error upon delete attempt`);
                            console.log(error);
                            database.close();
                        }
                        else
                        {
                            console.log(`${name} was successfully removed from database`);
                            database.close();
                        }
                    });
                });
            }
		});
}
else
{
    console.log('please provide "email" for the user to remove');
}