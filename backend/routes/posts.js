
//npm imports
const Express = require('express');

//middleware
const isLoggedIn = require('../middleware/session').isLoggedIn;
const validatePost = require('../middleware/validate-post');
const getImage = require('../middleware/image-retrieval').get;

//fields
const router = Express.Router();

const dateFormatting = require('../util/date-formatting'); 

//Mongoose Models
const Author = require('../models/author');
const Post = require('../models/post');

//puts the corresponding post for any route that contains the "id" param in the request
router.param("id", (request, response, next, id) => 
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

//route for displaying all posts in database
router.get('/', isLoggedIn, (request, response, next) => 
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
				post.published = dateFormatting.formatToString(new Date(post.createdAt));
				return post;
			});

			response.locals.posts = posts;
			response.render('posts');
		});
});


//route that sends all posts in database in json format, used for actual blogging site to communicate with
//the database
router.get('/json', (request, response) =>
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
			response.json(posts);
		});
});

//route for creating a new post
router.get('/new', isLoggedIn, (request, response, next) => 
{	
	response.render('new');
});

//route for editing a published post
router.get('/:id/edit', isLoggedIn, (request, response, next) => 
{
	const post = request.post;
	const formattedPost =
	{
		id: post.id,
		title: post.title,
		author: post.author,
		lead: post.lead,
		coverPhoto: {
			id: post.coverPhoto.id,
			links: {
				larger: post.coverPhoto.links.large,
				original: post.coverPhoto.links.original
			}
		},
		body: post.body
	}

	response.locals.post = formattedPost;
	response.render('edit');
});

// a post route for saving new post to database
router.post('/', isLoggedIn, getImage, (request, response, next) =>
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

// a post route for updating a post in the database
router.post("/:id/update", isLoggedIn, validatePost, getImage, (request, response, next) =>
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

// a post route for deleting a post in the database
router.post("/:id/delete", isLoggedIn, (request, response, next) =>
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