const axios = require('axios');
const toTitleCase = require('@gouch/to-title-case');

function getPexelImage(request, response, next)
{
    axios.get(`https://api.pexels.com/v1/photos/${request.body.coverPhoto}`,
              {
                  headers: {
                      authorization: "563492ad6f917000010000010addbcc086d04306b585cef35ce83730"
                  }
              })
         .then(function (pexelsResponse)
         {
            const imageData = pexelsResponse.data;
            
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

function getUnsplashImage(request, response, next)
{
    axios.get(`https://api.unsplash.com/photos/${request.body.coverPhoto}`,
              {
                  headers: {
                      authorization: "Client-ID 8361bf4ce9b4c0ad325bc983cc9c60c444245e4a650471aeeb557d0438f58f0e"
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