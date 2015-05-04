var socket = io();

socket.on('welcome', function (data) {
    socket.emit('i am client', { data: 'foo!', id: data.id });
});

socket.on('regenerate convex hull', function (data) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawConvexHull(data.pointsOnHull);
    drawPoints(data.initialPoints);
});

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    var canvas = document.getElementById("myCanvas");
    canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event) {
    var x = new Number();
    var y = new Number();
    var canvas = document.getElementById("myCanvas");
    
    if (event.x != undefined && event.y != undefined) {
        x = event.x;
        y = event.y;
    }
    else // Firefox method to get the position
    {
        x = event.clientX + document.body.scrollLeft +
							document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
							document.documentElement.scrollTop;
    }
    
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    
    socket.emit("add point", { x: x, y: y });
}


function drawConvexHull(data) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 600, 400);
    
    context.beginPath();
    
    context.moveTo(data[0].x, data[0].y);
    
    for (var i = 1; i < data.length; i++) {
        context.lineTo(data[i].x, data[i].y);
    }
    
    context.lineTo(data[0].x, data[0].y);
    
    context.stroke();
}

function drawPoints(points) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#FF0000";
    
    for (var i = 0; i < points.length; ++i) {
        context.fillRect(points[i].x - 2.5, points[i].y - 2.5, 5, 5);   
    }
}