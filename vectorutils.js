/// <summary>
/// Simple vector2 class.
/// </summary>
/// <param name="x">The x-coordinate.</param>
/// <param name="y">The y-coordinate.</param>
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
/// Generate a list of random points.
/// </summary>
/// <param name="count">The number of points to generate.</param>
/// <param name="xMax">The maximum value for the x-coord.</param>
/// <param name="yMax">The maximum value for the y-coord.</param>
/// <returns>A list of random points.</returns>
function generateRandomPoints(count, xMax, yMax) {
    var points = [];
    for (var i = 0; i < count; ++i) {
        points.push({ x: Math.random() * xMax, y: Math.random() * yMax });
    }
    return points;
}

exports.Vector2 = Vector2;
exports.orientation = orientation;
exports.distanceSquared = distanceSquared;
exports.findAngle = findAngle;
exports.generateRandomPoints = generateRandomPoints;