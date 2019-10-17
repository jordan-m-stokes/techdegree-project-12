
//npm imports
const Express = require('express');

//fields
const router = Express.Router();

const Author = require('../models/author');

//redirects home route to /posts
router.get('/', (request, response) => 
{
  	response.redirect('/posts');
});

//a login route that is redirected to if the user isn't logged in
router.get('/login', (request, response) => 
{
	response.locals.error = request.query.authenticationFailed;
	response.render('login');
});

//post route for authenticating user trying to log in
router.post('/login', (request, response, next) => 
{
	if(request.body.email && request.body.password)
	{
		Author.authenticate(request, function (error, author) 
        {
            if(error)
            {
				response.redirect('/login?authenticationFailed=true');
            }
            else
            {
                request.session.userId = author._id;
                response.redirect('/posts');
            }
        });
	}
	else
	{
		response.redirect('/login?authenticationFailed=true');
	}
});

//route for logging out user
router.get('/logout', (request, response, next) => 
{
	if(request.session)
	{
		request.session.destroy((error) => 
		{
			if(error)
			{
				return next(error);
			}
			return response.redirect('/login');
		});
	}
});

module.exports = router;