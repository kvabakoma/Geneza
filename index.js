/**
 * Created by Kvaba on 9/30/2019.
 */



const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path = require('path')
const sockets = require('./tools/sockets')


sockets.handelSocketConnections(app,expressWs)
sockets.setSocketServer(expressWs)


app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res){
  res.sendFile(__dirname +'/public/game.html');
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});

app.use(express.static(__dirname + '/public'))
app.listen(3000,function () {
  console.log(`Server listening on port 3000`)


});
