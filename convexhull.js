var vectorutils = require('./vectorutils.js');

/// <summary>
/// Simple vector attributes class used in the convex hull algorithm.
/// </summary>
/// <param name="vector">The vector.</param>
/// <param name="angle">The angle with the lowest vector.</param>
/// <param name="distanceSquared">The distance squared from the lowest vector.</param>
function VectorAttributes(vector, angle, distanceSquared) {
    this.vector = vector;
    this.angle = angle;
    this.distanceSquared = distanceSquared;
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

/// <summary>
/// Comparison function used for sorting the vectors.
/// </summary>
/// <param name="a">The first vector.</param>
/// <param name="b">The second vector.</param>
function compare(a, b) {
    if (a.angle < b.angle) {
        return -1;
    }
    if (a.angle > b.angle) {
        return 1;
    }
    return 0;
}

/// <summary>
/// Convex hull algorithm based on Graham scan.
/// </summary>
/// <remarks>
/// The first part of the algorithm performs preprocessing on the points.
/// The preprocessing involves removing points which are clearly not on the
/// convex hull. It then sorts the points before running the Graham scan.
/// </remarks>
/// <param name="input">The list of vectors.</param>
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
        var va = new VectorAttributes(
            input[i], 
            vectorutils.findAngle(lowestPoint, input[i]),
            vectorutils.distanceSquared(lowestPoint, input[i]));
        
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
        while (vectorutils.orientation(output[output.length - 2], output[output.length - 1], sortedPointList[i].vector) < 0) {
            output.pop();
        }
        output.push(sortedPointList[i].vector);
    }
    
    console.log(output);
    
    return output;
}

exports.convexHull = convexHull;
