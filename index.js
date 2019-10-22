/**
 * Created by Kvaba on 9/30/2019.
 */


const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path = require('path')
const sockets = require('./tools/sockets')




/*
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});*/
app.use(bodyParser.json())
app.get('/', function(req, res){
  res.sendFile(__dirname +'/public/game.html');
});
app.post('/cmd', function(req, res){
  let cmd = req.body.cmd
  sockets.changeBody(''+cmd)
  res.send({success:true})
  console.log(cmd)
});
app.get('/test', function(req, res){
  res.sendFile(__dirname +'/public/test.html');
});
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});

app.use(express.static(__dirname + '/public'))
app.listen(3030,function () {
  console.log(`Server listening on port 3030`)


});
sockets.handelSocketConnections(app,expressWs)
sockets.setSocketServer(expressWs)
