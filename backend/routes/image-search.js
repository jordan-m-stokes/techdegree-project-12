
//npm imports
const Express = require('express');
const axios = require('axios');
const toTitleCase = require('@gouch/to-title-case')

//middleware
const isLoggedIn = require('../middleware/session').isLoggedIn;

//fields
const router = Express.Router();

function handleResponse(pexelsResponse)
{
    const imageData = pexelsResponse.data.photos;

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
            src: photo.src
        }
    });

    return jsonResponse;
}

router.get('/', isLoggedIn, (request, response, next) => 
{
    axios.get(`https://api.pexels.com/v1/curated?per_page=12&page=1`,
              {
                  headers: {
                      authorization: "563492ad6f917000010000010addbcc086d04306b585cef35ce83730"
                  }
              })
         .then(function (pexelsResponse)
         {
            response.json(handleResponse(pexelsResponse));
         })
         .catch(function (error)
         {
            next(error);
         });
});

router.get('/:search', isLoggedIn, (request, response, next) => 
{
    axios.get(`https://api.pexels.com/v1/search?query=${request.params.search}&per_page=12&page=1`,
              {
                  headers: {
                      authorization: "563492ad6f917000010000010addbcc086d04306b585cef35ce83730"
                  }
              })
         .then(function (pexelsResponse)
         {
            response.json(handleResponse(pexelsResponse));
         })
         .catch(function (error)
         {
            next(error);
         });
});

module.exports = router;