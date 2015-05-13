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
        generatePoints();
        
        // Run the convex hull algorithm.
        calculateConvexHull();

    } else if (req.body['ClearButton']) {
        clearPoints();
    }
    
    // Refresh the browser.
    res.redirect('/');
});

function addPoint(point) {
    initialPoints.push({ x: point.x, y: point.y });
}

function getInitialPoints() {
    return initialPoints;
}

function generatePoints() {
    initialPoints = vectorutils.generateRandomPoints(pointCount, 1200, 800);
    return initialPoints;
}

function calculateConvexHull() {
    pointsOnHull = convexHull(initialPoints);
    return pointsOnHull;
}

function clearPoints() {
    pointsOnHull = [];
    initialPoints = [];
}

// Expose the router to the world.
module.exports = router;
module.exports.addPoint = addPoint;
module.exports.getInitialPoints = getInitialPoints;
module.exports.generatePoints = generatePoints;
module.exports.calculateConvexHull = calculateConvexHull;
module.exports.clearPoints = clearPoints;