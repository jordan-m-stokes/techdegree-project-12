
//npm imports
const Express = require('express');

//fields
const router = Express.Router();

//index route handler
router.get('/', (request, response) => 
{
    
    response.json();
});

module.exports = router;