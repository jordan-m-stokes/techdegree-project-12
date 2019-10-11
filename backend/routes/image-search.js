
//npm imports
const Express = require('express');
const axios = require('axios');
const toTitleCase = require('@gouch/to-title-case')

//middleware
const isLoggedIn = require('../middleware/session').isLoggedIn;

//fields
const router = Express.Router();

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

        const jsonResponse = imageData.map(photo => 
        {
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

router.get('/', isLoggedIn, (request, response, next) => 
{
    const database = request.query.database;

    if(database === 'unsplash')
    {
        axios.get(`https://api.unsplash.com/photos?order_by=popular&page=1&per_page=12`,
                {
                    headers: {
                        authorization: "Client-ID 8361bf4ce9b4c0ad325bc983cc9c60c444245e4a650471aeeb557d0438f58f0e"
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
        axios.get(`https://api.pexels.com/v1/curated?per_page=12&page=1`,
                {
                    headers: {
                        authorization: "563492ad6f917000010000010addbcc086d04306b585cef35ce83730"
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

router.get('/:search', isLoggedIn, (request, response, next) => 
{
    const database = request.query.database;

    if(database === 'unsplash')
    {
        axios.get(`https://api.unsplash.com/search/photos?query=${request.params.search}&page=1&per_page=12`,
                {
                    headers: {
                        authorization: "Client-ID 8361bf4ce9b4c0ad325bc983cc9c60c444245e4a650471aeeb557d0438f58f0e"
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
        axios.get(`https://api.pexels.com/v1/search?query=${request.params.search}&per_page=12&page=1`,
                {
                    headers: {
                        authorization: "563492ad6f917000010000010addbcc086d04306b585cef35ce83730"
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