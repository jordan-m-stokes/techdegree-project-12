const axios = require('axios');
const toTitleCase = require('@gouch/to-title-case');

//retrieves image from pexels and prepares data to store in database
function getPexelImage(request, response, next)
{
    axios.get(`https://api.pexels.com/v1/photos/${request.body.coverPhoto}`,
              {
                  headers: {
                      authorization: request.environment.API_KEY_PEXELS
                  }
              })
         .then(function (pexelsResponse)
         {
            const imageData = pexelsResponse.data;
            
            //title is parsed from url
            let title = imageData.url.split('/')[4];
            title = title.replace(`-${request.body.coverPhoto}`, '');

            while(title.includes('-'))
            {
                title = title.replace('-', ' ');
            }

            title = title.toTitleCase();

            request.body.coverPhoto = 
            {
                id: request.body.coverPhoto,
                resolution: {
                    width: imageData.width,
                    height: imageData.height
                },
                title: title,
                links: {
                    original: imageData.src.original,
                    tiny: imageData.src.tiny,
                    small: imageData.src.small,
                    medium: imageData.src.medium,
                    large: imageData.src.large,
                    extraLarge: imageData.src.large2x
                }
            };
            next();
         })
         .catch(function (error)
         {
            next(error);
         });
}

//retrieves image from unsplash and prepares data to store in database
function getUnsplashImage(request, response, next)
{
    axios.get(`https://api.unsplash.com/photos/${request.body.coverPhoto}`,
              {
                  headers: {
                      authorization: `Client-ID ${request.environment.API_KEY_UNSPLASH}`
                  }
              })
         .then(function (unsplashResponse)
         {
            const imageData = unsplashResponse.data;
            
            let title = imageData.alt_description.toTitleCase();

            request.body.coverPhoto = 
            {
                id: request.body.coverPhoto,
                resolution: {
                    width: imageData.width,
                    height: imageData.height
                },
                title: title,
                links: {
                    original: imageData.urls.full,
                    tiny: imageData.urls.thumb,
                    small: imageData.urls.small,
                    medium: imageData.urls.regular,
                    large: imageData.urls.regular,
                    extraLarge: imageData.urls.full
                }
            };
            next();
         })
         .catch(function (error)
         {
            next(error);
         });
}

//determines if cover photo id is an unsplash or pexel id and makes a request to the corresponding api
function get(request, response, next)
{
    if(isNaN(request.body.coverPhoto))
    {
        getUnsplashImage(request, response, next);
    }
    else
    {
        getPexelImage(request, response, next);
    }
}


module.exports.get = get;