var express = require('express');
var convexHull = require('../convexhull.js');
var vectorutils = require('../vectorutils.js');

var router = express.Router();

var pointCount = 4;
var pointsOnHull = [];
var initialPoints = [];

// Get the index.
router.get('/', function (req, res) {

    res.render('index', {
        title: 'Convex Hull',
        pointCount: pointCount,
        initialPoints: initialPoints,
        pointsOnHull: pointsOnHull
    });
});

// Add an item to the list.
router.post('/generate', function (req, res) {
    console.log('req.body.GenerateButton', req.body['GenerateButton']);
    if (req.body['GenerateButton']) {
        
        // PointCount comes from the .ejs file.
        if (!(isNaN(req.body.pointCount) || req.body.pointCount == "")) {
            // Keep track of previous valid point count.
            pointCount = req.body.pointCount;
        }
        
        // Generate random points.
        initialPoints = vectorutils.generateRandomPoints(pointCount, 600, 400);
        
        initialPoints =
        [
            { x: 10, y: 10 },
            { x: 50, y: 10 },
            { x: 5, y: 30 },
            { x: 50, y: 60 },
        ];
        
        // Run the convex hull algorithm.
        pointsOnHull = convexHull(initialPoints);

        console.log(pointsOnHull);

    } else if (req.body['ClearButton']) {
        pointsOnHull = [];
        initialPoints = [];
    }
    
    // Refresh the browser.
    res.redirect('/');
});

// Expose the router to the world.
module.exports = router;