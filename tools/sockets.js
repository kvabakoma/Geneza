/**
 * Created by Kvaba on 2/26/2019.
 */

let connections = {}
let socketsInstance

var races = ['SAPIENS', 'SYSTEMA', 'ENTROPIA', 'AHRIMAN', 'MATERIA', 'ANIMA', 'GENEZA'];
var bodyparts = ['HEAD', 'ARM LEFT', 'ARM RIGHT', 'LEG LEFT', 'LEG RIGHT', 'BODY', 'CROUCH'];
var prevCommand = [1, 1, 1, 1, 1, 1, 1]
module.exports = {

  getSockets: GetAllSockets,
  sendToSocket: sendToConnectedSocket,
  getSocketById: getSocketConnectionById,
  setSocketServer(ss){
    socketsInstance = ss
  },
  handelSocketConnections: (app) => {
    app.ws('/ws/:id', function (ws, req) {
      /*if (getSocketConnectionById(req.params.id)) {
       console.log('SOCKET WITH ID ALREADY CONNECT$ED')
       ws.close()
       }*/
      let pingInterval = setInterval(function () {

        try {
          ws.send(JSON.stringify({Action: 'ping'}))
        } catch (error) {

          clearInterval(pingInterval);

          console.log('PING ' + error.message, ws.id)
        }
      }, 15000)


      try {
        ws.send(JSON.stringify('CONNECTED'))

      } catch (error) {

        console.error(error.message, ws.id)

      }

      handelClientConnection(ws, req)


      ws.on('message', function (msg) {
        /* if(ws.id==123||ws.id==124){
         console.log('INCOMING MSG : ', msg)
         }*/

        console.log(ws.id)
        if (ws.id == 'test') {
          handelBodyChange(msg)
        }


      });
      ws.on('close', function () {
        console.log('CLOSE CONNECTION ', ws.id)
        if (pingInterval) {
          clearInterval(pingInterval)
        }

        delete connections[ws.id]

      });


    });


  }


}


function handelBodyChange(comand) {
  console.log(comand)
  var cmd = comand.split('')
  var changed = getDiff(prevCommand, cmd)
  prevCommand = cmd
  var parts = {}
  console.log('OBJECT LEN')
  console.log(Object.keys(changed).length)
  if (Object.keys(changed).length > 0) {
    Object.keys(changed).forEach(function (key, index) {
      if (changed[key] > 0) {
        parts[bodyparts[key]] = races[changed[key] - 1]
      } else {
        parts[bodyparts[key]] = null
      }

    });
  }
  console.log(parts)
  var data = {
    type: 'body-move',
    data: parts
  }
  console.log('CHANGED')
  console.log(data)
  sendToConnectedSocket(JSON.stringify(data),'geneza')
}

function getDiff(prev, current) {
  var diff = {}
  for (var i = 0; i < prev.length; i++) {
    if (prev[i] != current[i]) {
      diff[i] = current[i]
    }

  }
  return diff
}

function sendToConnectedSocket(data, socketId, ind) {

  let socket = getSocketConnectionById(socketId)
  if(socket)
  socket.send(data)
  /* if(socket && !socket.closed && socket.id!='client' ){
   if(globals.UNLOCK_TIMERS[socket.id]){
   clearTimeout(globals.UNLOCK_TIMERS[socket.id])
   startTimer(socket)
   }else{
   startTimer(socket)

   }
   }
   console.log('SEND TO SOCKET', socket.id, socket.closed)
   if (socketId == 'client') {
   if (connections['client']) {
   connections['client'].forEach(function (client) {
   try {

   client.send(JSON.stringify(data))
   } catch (error) {
   Log.error(error.message, 'client')
   if (client) {
   connections['client'].splice(client.ind, 1);
   }

   }

   });
   }

   } else if (socket && socket.id) {
   console.log('IS SOCKET COLOSED ', socket.id, socket.closed)
   if (!socket.closed) {
   try {
   socket.send(data)
   socket.closed = true;
   } catch (error) {
   Log.error(error.message, socket.id)
   }
   } else {
   Log.info('Socket is not available', socket.id)

   }


   } else {
   Log.info('SOCKET IS NOT CONNECTED', socket.id)

   }*/
}

function getSocketConnectionById(id) {
  let clients = socketsInstance.getWss('/').clients
  let socket = false
  clients.forEach(function (client) {
    if (client.id == id) {
      socket = client
    }
  })

  return socket


}


function handelClientConnection(ws, req) {
  let id = req.params.id
  ws.id = id

  console.info('DEVICE CONNECT ', id)
  ws.closed = false


}


function GetAllSockets() {
  return socketsInstance.getWss('/').clients
}



