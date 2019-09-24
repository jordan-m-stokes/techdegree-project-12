const axios = require('axios');

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

            request.body.coverPhoto = 
            {
                id: request.body.coverPhoto,
                resolution: {
                    width: imageData.width,
                    height: imageData.height
                },
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