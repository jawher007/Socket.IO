var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8000;
var parralel_count = 0;
const fs = require('fs');

let rawdata = fs.readFileSync('path.json');
let test = JSON.parse(rawdata);
// DISPLAY VALUES
var keys = Object.keys(test);
for (var i = 0; i < keys.length; i++) {
    parralel_count = test[keys[i]];
}
console.log(parralel_count);
// DISPLAY Keys
/*      for(var key in test){ alert(key);}         */


app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    console.log('new connection made');

    socket.on('event1', (data) => {
        console.log(data.msg);
    });

    socket.emit('event2', {
        msg: parralel_count + ' Parralel Tests'
    });

    socket.on('event3', (data) => {
        console.log(data.msg);
        socket.emit('event4', {
            msg: 'Loud and clear :)'
        });
    });
});

io.on('disconnect', (socket) => {
    console.log('disconnected');
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});