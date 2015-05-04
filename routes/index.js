var express = require('express');
var convexhull = require('../convexhull.js');

var router = express.Router();

var pointCount = 4;

// Default list of points.
var initialPoints = [
    { x: 100, y: 100 },
    { x: 100, y: 300 },
    { x: 300, y: 300 },
    { x: 300, y: 100 }
];

var pointsOnHull = [];

// Get the index.
router.get('/', function (req, res) {

    res.render('index', {
        title: 'Convex Hull',
        initialPoints: initialPoints,
        pointsOnHull: pointsOnHull
    });
});

// Add an item to the list.
router.post('/generate', function (req, res) {
    
    // PointCount comes from the .ejs file.
    if (!(isNaN(req.body.pointCount) || req.body.pointCount == "")) {
        pointCount = req.body.pointCount;
    }
    
    // Generate random points.
    initialPoints = [];
    for (var i = 0; i < pointCount; ++i) {
        initialPoints.push({ x: Math.random() * 600, y: Math.random() * 400 });
    }
    
    // Run the convex hull algorithm.
    pointsOnHull = convexhull.convexHull(initialPoints);
    
    // Refresh the browser.
    res.redirect('/');
});

// Expose the router to the world.
module.exports = router;