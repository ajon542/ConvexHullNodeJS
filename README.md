# ConvexHull

Finds the convex hull given a set of points.

# Example

```javascript
var convexHull = require('./convexhull.js');

// Create some initial points.
var initialPoints =
    [
        { x: 10, y: 10 },
        { x: 50, y: 10 },
        { x: 5, y: 30 },
        { x: 50, y: 60 },
    ];

// Calculate convex hull.
var pointsOnHull = convexHull(initialPoints);

// Log output.
console.log(pointsOnHull)
```

Output:

```
[ { x: 10, y: 10 },
  { x: 50, y: 10 },
  { x: 50, y: 60 },
  { x: 5, y: 30 } ]
```

# Install

This module works in [node.js](https://nodejs.org/).

# API

```javascript
var pointsOnHull = convexHull(initialPoints);
```

#### `var pointsOnHull = convexHull(initialPoints)`

The default method from the package calculate the convex hull, given a set of points.

* `initialPoints` is an array of points.

**Returns** The set of points on the convex hull.

# Notes and references

* http://en.wikipedia.org/wiki/Graham_scan



