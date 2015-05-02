var express = require('express');

var router = express.Router();

// Print out the userId
router.get('/user/:id', function (req, res) {
    var userId = req.params.id;
    res.send('Hello: ' + userId);
});

// Redirect to google.com
router.get('/redirect', function (req, res) {
    res.redirect('http://www.google.com');
});

// Expose the router to the world.
module.exports = router;