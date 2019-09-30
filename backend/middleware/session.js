
const Author = require('../models/author');

function isLoggedIn(request, response, next)
{
    if(request.session && request.session.userId)
    {
        Author.findById(request.session.userId)
            .exec((error, author) => 
            {
                if(error)
                {
                    return next(error);
                }
                if(!author) 
                {
                    return response.redirect('/login');
                }
                return next();
            });
    }
    else
    {
        response.redirect('/login');
    }
}

module.exports.isLoggedIn = isLoggedIn;