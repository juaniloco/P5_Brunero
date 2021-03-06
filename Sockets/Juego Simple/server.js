
var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat', "Prueba");
}

io.sockets.on('connection',

  function(socket) {

    console.log("We have a new client: " + socket.id);


    socket.on('update',
      function(data) {
        socket.emit('show', data);
      }

    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
