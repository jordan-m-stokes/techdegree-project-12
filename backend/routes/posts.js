
//npm imports
const Express = require('express');

//middleware
const pexels = require('../middleware/pexels');

//fields
const router = Express.Router();

const dateFormatting = require('../util/date-formatting'); 

//Mongoose Models
const Post = require('../models/post');

//puts the corresponding post for any route that contains the "id" param in the request
router.param(":id", (request, response, next, id) => 
{
      Post.findById(id)
            .exec((error, post) => 
            {
                if(error)
                {
                    return next(error);
                }
                if(!post) 
                {
                    error = new Error('Not Found');
                    error.status = 404;
                    return next(error);
                }
                request.post = post;
                next();
            });
});
router.get('/', (request, response) => 
{
	Post.find({})
		.sort({createdAt: -1})
		.exec((error, posts) => 
		{
			if(error)
			{
				error.status = 400;
				return next(error);
			}
			
			posts = posts.map(post => 
			{
				console.log(post);
				post.published = dateFormatting.formatToString(new Date(post.createdAt));
				return post;
			});

			response.locals.posts = posts;
			response.render('posts');
		});
});

//GET all posts on a page
router.get('/page/:page', (request, response, next) => 
{
	response.render('posts');
});

//GET new book form
router.get('/new', (request, response, next) => 
{	
	response.render('new');
});

//GET individual book for edit
router.get('/:id/edit', (request, response, next) => 
{
	response.locals.post = request.post;
	response.render('edit');
});

// POST create post
router.post('/', pexels.getImage, (request, response, next) =>
{
	const post = new Post(request.body);

	//saves course
	post.save((error, doc) => 
	{
		if(error)
		{ 
			error.status = 400;
			return next(error);
		}
		response.status(201);
		response.redirect('/');
	});
});

//PUT update article
router.post("/:id/update", pexels.getImage, (request, response, next) =>
{
	request.post.update(request.body, (error, result) => 
	{
		if(error)
		{
			error.status = 400;
			return next(error);
		}
		response.status(204);
		response.redirect('/');
	});
});

/* POST delete article. */
router.post("/:id/delete", (request, response, next) =>
{
	request.post.remove((error) => 
	{
		if(error)
		{
			error.status = 400;
			return next(error);
		}
		response.status(204);
		response.redirect('/');
	});
});

module.exports = router;