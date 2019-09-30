
//npm imports
const Express = require('express');

//fields
const router = Express.Router();

const Author = require('../models/author');

//index route handler
router.get('/', (request, response) => 
{
  	response.redirect('/posts');
});

router.get('/login', (request, response) => 
{
	response.render('login');
});

router.post('/login', (request, response, next) => 
{
	if(request.body.email && request.body.password)
	{
		Author.authenticate(request, function (error, author) 
        {
            if(error)
            {
                next(error);
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
		response.redirect('/login');
	}
});

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