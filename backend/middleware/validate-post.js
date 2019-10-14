
function validatePost(request, response, next)
{
    request.url.split('/')[2];

    next();
}

module.exports = validatePost;

