var server = io();
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var mouse_down = false;
var past;
var current;


canvas.addEventListener('mousedown', function (event) {
  mouse_down = true;
  // console.log('down', event.offsetX, event.offsetY);
});
canvas.addEventListener('mouseup', function (event) {
  mouse_down = false;
  past = null;
  // console.log('up', event.offsetX, event.offsetY);
});
canvas.addEventListener('mousemove', function (event) {
  if (mouse_down) {
    // console.log('move', event.offsetX, event.offsetY);
    current = [event.offsetX, event.offsetY];
    if (past) {
      send_draw(past, current);
    }

    past = [event.offsetX, event.offsetY];
  }
});
function send_draw (past, current) {
  server.emit('draw', [past, current, $('.color').val(), $('.slider').val()]);
}

server.on('do-draw', function (data) {
  draw(data[0], data[1], data[2], data[3]);
});

function draw (past, current, c, w) {
  ctx.beginPath();
  ctx.moveTo(past[0], past[1]);
  ctx.quadraticCurveTo(
    past[0], past[1],
    current[0], current[1]
  );
  ctx.closePath();
  ctx.lineWidth = w;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = c;
  ctx.stroke();
}
