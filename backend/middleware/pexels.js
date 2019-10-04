const axios = require('axios');
const toTitleCase = require('@gouch/to-title-case');

function getImage(request, response, next)
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
            error.message = "failed to fetch data from pexels";
            next(error);
         });
}

module.exports.getImage = getImage;