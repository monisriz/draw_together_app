var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/socket-io', express.static('node_modules/socket.io-client/dist'));

app.set('view engine', 'hbs');
app.use('/static', express.static('public'));

app.get('/', function (request, response) {
  response.render('paint.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');

  client.on('draw', function (data) {
    console.log('Coords', data[0], data[1]);
    console.log('Color', data[2]);
    console.log('Pen Width', data[3]);
    io.emit('do-draw', data);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
