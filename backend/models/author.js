const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});


//authenticates user making a request is in the database
AuthorSchema.statics.authenticate = function(request, callback) 
{
    //searches for author based on email provided
    Author.findOne({ email: request.body.email })
        .exec((error, author) => 
        {
            if(error)
            {
                return callback(error);
            }
            else if(!author)
            {
                const error = new Error('Author not found');
                error.status = 401;
                return callback(error);
            }
            //if there is no error and author exists, the encrypted password provided is verified
            bcrypt.compare(request.body.password, author.password, (error, result) =>
            {
                if(error || !author)
                {
                    const error = new Error('Wrong email or password');
                    error.status = 401;
                    callback(error, null);
                }
                //if password is a match, the callback is called passing the corresponding user within
                else
                {
                    return callback(null, author);
                }
            });
        });
};

//before a new user is saved, the password will be encrypted
AuthorSchema.pre('save', function(next) 
{
    bcrypt.hash(this.password, 10, (error, hash) =>
    {
        if(error)
        {
            return next(error);
        }
        this.password = hash;
        next();
    });
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;