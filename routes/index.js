var express = require('express');

var router = express.Router();

// List of points.
var points = [
    { x: 100, y: 100 },
    { x: 100, y: 300 },
    { x: 300, y: 300 },
    { x: 300, y: 100 }
];

// Get the index.
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Convex Hull',
        items: points
    });
});

// Add an item to the list.
router.post('/generate', function (req, res) {
    
    // pointCount comes from the .ejs file.
    var pointCount = req.body.pointCount;
    if (isNaN(pointCount) || pointCount == "") {
        pointCount = 5;
    }
    points = [];
    
    for (var i = 0; i < pointCount; ++i) {
        points.push({ x: Math.random() * 600, y: Math.random() * 400 });
    }
    
    // Refresh the browser.
    res.redirect('/');
});

// Expose the router to the world.
module.exports = router;