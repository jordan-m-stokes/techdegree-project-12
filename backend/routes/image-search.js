
//npm imports
const Express = require('express');
const axios = require('axios');
const toTitleCase = require('@gouch/to-title-case')

//middleware
const isLoggedIn = require('../middleware/session').isLoggedIn;

//fields
const router = Express.Router();

//handles a response from unsplash or pixels api
function handleResponse(response, database)
{
    if(database === 'unsplash')
    {
        let imageData = [];

        if(response.data.results)
        {
            imageData = response.data.results;
        }
        else
        {
            imageData = response.data;
        }

        //data is formatted properly so the client can properly read it
        const jsonResponse = imageData.map(photo => 
        {
            return {
                id: photo.id,
                title: `${photo.alt_description}`.toTitleCase(),
                src: {
                    smaller: photo.urls.thumb,
                    larger: photo.urls.regular,
                    original: photo.urls.full
                }
            }
        });
        return jsonResponse;
    }
    else
    {
        const imageData = response.data.photos;

        //data is formatted properly so the client can properly read it
        const jsonResponse = imageData.map(photo => 
        {
            //title is parsed from url
            let id = photo.url.split('-');
            id = id[id.length - 1].split('/')[0];

            let title = photo.url.split('/')[4];
            title = title.replace(`-${id}`, '');

            while(title.includes('-'))
            {
                title = title.replace('-', ' ');
            }

            title = title.toTitleCase();

            return {
                id: id,
                title: title,
                src: {
                    smaller: photo.src.tiny,
                    larger: photo.src.large,
                    original: photo.src.original
                }
            }
        });
        return jsonResponse;
    }
    

}

//default route for /image-search
//sends the user currated photos if search query isn't provided
router.get('/', isLoggedIn, (request, response, next) => 
{
    const database = request.query.database;

    if(database === 'unsplash')
    {
        //request for unsplash photos
        axios.get(`https://api.unsplash.com/photos?order_by=popular&page=1&per_page=12`,
                {
                    headers: {
                        authorization: `Client-ID ${request.environment.API_KEY_UNSPLASH}`
                    }
                })
            .then(function (unsplashResponse)
            {
                response.json(handleResponse(unsplashResponse, database));
            })
            .catch(function (error)
            {
                next(error);
            });
    }
    else
    {
        //request for pexels photos
        axios.get(`https://api.pexels.com/v1/curated?per_page=12&page=1`,
                {
                    headers: {
                        authorization: request.environment.API_KEY_PEXELS
                    }
                })
            .then(function (pexelsResponse)
            {
                response.json(handleResponse(pexelsResponse, database));
            })
            .catch(function (error)
            {
                next(error);
            });
    }
});

//sends the user photos from either pexels.com or unsplash.com based on search query
router.get('/:search', isLoggedIn, (request, response, next) => 
{
    const database = request.query.database;

    //request for unsplash photos
    if(database === 'unsplash')
    {
        axios.get(`https://api.unsplash.com/search/photos?query=${request.params.search}&page=1&per_page=12`,
                {
                    headers: {
                        authorization:  `Client-ID ${request.environment.API_KEY_UNSPLASH}`
                    }
                })
            .then(function (unsplashResponse)
            {
                response.json(handleResponse(unsplashResponse, database));
            })
            .catch(function (error)
            {
                next(error);
            });
    }
    //request for pexels photos
    else
    {
        axios.get(`https://api.pexels.com/v1/search?query=${request.params.search}&per_page=12&page=1`,
                {
                    headers: {
                        authorization: request.environment.API_KEY_PEXELS
                    }
                })
            .then(function (pexelsResponse)
            {
                response.json(handleResponse(pexelsResponse, database));
            })
            .catch(function (error)
            {
                next(error);
            });
    }
});

module.exports = router;