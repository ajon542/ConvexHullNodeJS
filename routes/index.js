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
    
    // PointCount comes from the .ejs file.
    var pointCount = req.body.pointCount;
    if (isNaN(pointCount) || pointCount == "") {
        pointCount = 5;
    }
    
    // Generate random points.
    points = [];
    for (var i = 0; i < pointCount; ++i) {
        points.push({ x: Math.random() * 600, y: Math.random() * 400 });
    }
    
    // Run the convex hull algorithm.
    var output = convexHull(points);
    points = output;
    
    // Refresh the browser.
    res.redirect('/');
});

function Vector2(x, y) {
    this.x = x;
    this.y = y;
}

/// <summary>
/// Calculates the orientation of a vector given two other vectors.
/// </summary>
/// <remarks>
///     > 0 counter-clockwise
///     = 0 colinear
///     < 0 clockwise 
/// </remarks>
/// <param name="v1">The first vector.</param>
/// <param name="v2">The second vector.</param>
/// <param name="v3">The vector to calculate the orientation for.</param>
/// <returns>The orientation of the given vector.</returns>
function orientation(v1, v2, v3) {
    return (v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x);
}

/// <summary>
/// Calculate the distance squared between two vectors.
/// </summary>
/// <param name="v1">The first vector.</param>
/// <param name="v2">The second vector.</param>
/// <returns>The distance squared between two vectors.</returns>
function distanceSquared(v1, v2) {
    var x = Math.abs(v1.x - v2.x);
    var y = Math.abs(v1.y - v2.y);
    
    return (x * x) + (y * y);
}

/// <summary>
/// Calculate the angle between two vectors.
/// TODO: This could probably be removed and the Orientation method utilized instead.
/// </summary>
/// <param name="v1">The first vector.</param>
/// <param name="v2">The second vector.</param>
/// <returns>The angle between two vectors.</returns>
function findAngle(v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

/// <summary>
/// Find the point with the lowest y-coord. If there are multiple
/// points with the same lowest y-coord, choose the one with the
/// lowest x-coord.
/// </summary>
/// <param name="pointList">A list of points..</param>
/// <returns>The lowest point.</returns>
function findLowestPoint(input) {
    var lowestPoint = input[0];

    for (var i = 0; i < input.length; ++i) {
        if (input[i].y < lowestPoint.y) {
            lowestPoint = input[i];
        } else if (input[i].y == lowestPoint.y) {
            if (input[i].x < lowestPoint.x) {
                lowestPoint = input[i];
            }
        }
    }

    return lowestPoint;
}

function VectorAttributes(vector, angle, distanceSquared) {
    this.vector = vector;
    this.angle = angle;
    this.distanceSquared = distanceSquared;
}

function convexHull(input) {
    // Three or less points is already the ocnvex hull.
    if (input.length <= 3) {
        return input;
    }

    var dict = [];
    var lowestPoint = findLowestPoint(input);
    
    // Calculate angle and distance for each vector based on the lowest point.
    // The idea is to update the vector in the dictionary if it has a lesser distance
    // to the starting point than the new vector.
    for (var i = 0; i < input.length; ++i) {
        
        // Create the vector angle and distance attributes.
        var va = new VectorAttributes(input[i], findAngle(lowestPoint, input[i]), distanceSquared(lowestPoint, input[i]));
        
        // Add the vector to the dictionary.
        if (va.angle in dict) {
            // If the distance is greater, update the value in the dictionary.
            if (dict[va.angle].distanceSquared < va.distanceSquared) {
                dict[va.angle] = va;
            }
        } else {
            // A vector for this angle doesn't exist, so add one.
            dict[va.angle] = va;
        }
    }
    
    // Sort the points by angle with lowest point.
    var sortedPointList = [];
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            sortedPointList.push(dict[key]);
        }
    }
    sortedPointList.sort(compare);
    
    // Graham Scan algorithm.
    var output = [];
    output.push(sortedPointList[0].vector);
    output.push(sortedPointList[1].vector);
    output.push(sortedPointList[2].vector);

    for (var i = 3; i < sortedPointList.length; ++i) {
        while (orientation(output[output.length - 2], output[output.length - 1], sortedPointList[i].vector) < 0) {
            output.pop();
        }
        output.push(sortedPointList[i].vector);
    }

    console.log(output);

    return output;
}

function compare(a, b) {
    if (a.angle < b.angle) {
        return -1;
    }
    if (a.angle > b.angle) {
        return 1;
    }
    return 0;
}


// Expose the router to the world.
module.exports = router;