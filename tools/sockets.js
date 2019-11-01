/**
 * Created by Kvaba on 2/26/2019.
 */

let connections = {}
let socketsInstance
var isPlayingVideo = false
var races = ['SAPIENS', 'SYSTEMA', 'ENTROPIA', 'AHRIMAN', 'MATERIA', 'ANIMA', 'GENEZA'];
var bodyparts = ['HEAD', 'ARM LEFT', 'ARM RIGHT', 'BODY', 'LEG RIGHT', 'LEG LEFT', 'CROUCH'];
var prevCommand = [1, 1, 1, 1, 1, 1, 1]
module.exports = {
  changeBody: handelBodyChange,
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


        }
      }, 15000)


      try {
        ws.send(JSON.stringify('CONNECTED'))

      } catch (error) {

        console.error(error.message, ws.id)

      }

      handelClientConnection(ws, req)


      ws.on('message', function (msg) {
        if (ws.id == 'test') {
          handelBodyChange(msg)
        }

        if (ws.id = 'geneza') {
         let msgObject = JSON.parse(msg)
          isPlayingVideo = msgObject.isPLaying
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


function handelBodyChange(comand, inital) {
  if (isPlayingVideo) {

    return
  }
  var cmd = comand.split('')

  var changed = getDiff(prevCommand, cmd, inital)
  prevCommand = cmd
  var parts = {}

  if (Object.keys(changed).length > 0) {
    Object.keys(changed).forEach(function (key, index) {
      if (changed[key] > 0) {
        parts[bodyparts[key]] = races[changed[key] - 1]
      } else {
        parts[bodyparts[key]] = null
      }

    });
  }
  if (!inital) {
    var data = {
      type: 'body-move',
      data: parts
    }
    sendToConnectedSocket(JSON.stringify(data), 'geneza')
  } else {
    var data = {
      type: 'init',
      data: parts
    }
    sendToConnectedSocket(JSON.stringify(data), 'geneza')
  }

}

function getDiff(prev, current, initial) {
  var diff = {}
  for (var i = 0; i < prev.length; i++) {
    if (!initial) {
      if (prev[i] != current[i]) {
        diff[i] = current[i]
      }
    } else {
      diff[i] = current[i]
    }


  }
  return diff
}

function sendToConnectedSocket(data, socketId, ind) {

  let sockets = getSocketConnectionById(socketId)
  if (sockets.length) {
    sockets.forEach((socket, index) => {
      socket.send(data)
    })
  }


}

function getSocketConnectionById(id) {
  let clients = socketsInstance.getWss('/').clients
  let socket = []
  clients.forEach(function (client) {
    if (client.id == id) {
      socket.push(client)
    }
  })

  return socket


}


function handelClientConnection(ws, req) {
  let id = req.params.id
  ws.id = id
  console.info('DEVICE CONNECT ', id)
  handelBodyChange(prevCommand.join(''), true)

  ws.closed = false
}


function GetAllSockets() {
  return socketsInstance.getWss('/').clients
}



