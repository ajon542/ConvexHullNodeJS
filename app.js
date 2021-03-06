﻿var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var convexHull = require('./convexhull.js');

var app = express();

// Configure application.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use middleware. These occur in order.
// bootstrap and jquery
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

// For parsing the body of the request.
app.use(bodyParser());

// Simple example of logging middleware.
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url + ' ' + (new Date()));
    
    // Middleware that doesn't generate a response, must call
    // next() or the request will never end.
    next();
});

// Define the routes.
var routes = require('./routes/index');
app.use(routes);

// Start the server and listen for incoming connections.
var port = 1337;
var io = require('socket.io').listen(app.listen(port, function () {
    console.log('ready on port ' + port);
}));


// Emit welcome message on connection
io.on('connection', function (socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    
    socket.on('i am client', console.log);

    socket.on('add point', function (data) {
        
        routes.addPoint({ x: data.x, y: data.y });

        var pointsOnHull = routes.calculateConvexHull();
        var initialPoints = routes.getInitialPoints();
        
        socket.emit("regenerate convex hull", { initialPoints: initialPoints, pointsOnHull: pointsOnHull });
    });
});
