/**
 * Created by Kvaba on 2/26/2019.
 */

let connections = {}
let socketsInstance

module.exports = {

    getSockets: GetAllSockets,
    processReceipts: processPendingReceipts,
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
                handelDeviceMessage(ws, msg)


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


function sendToConnectedSocket(data, socketId, ind) {
    let socket = getSocketConnectionById(socketId)

 if(socket && !socket.closed && socket.id!='client' ){
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

    }
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

function handelDeviceMessage(ws, messageData) {
    let msg
    try {
        msg = JSON.parse(messageData)
    } catch (err) {
        ws.closed = false
        Log.error(err.message, ws.id)
        console.log(err)
        return
    }

    if( !(msg.Action && msg.Action=='ping')   ){
        ws.closed= false
    }

    if (msg.MessageId) {
        let id = msg.MessageId
        if (msg.Status && msg.Status == 'error') {
            Log.error(`${msg.MessageId } ERROR STATUS -${msg.MsgData} -${msg.MsgStatus}`, ws.id)
            Command.changeStatus(id, true)
                .then(result => {

                    ws.closed = false
                    processPendingReceipts(ws.id)
                })
                .catch(err => {
                    Log.error(err.message, ws.id)
                    ws.closed = false
                })

        } else {
            Command.changeStatus(id)
                .then(result => {

                    ws.closed = false
                    processPendingReceipts(ws.id)
                })
                .catch(err => {
                    Log.error(err.message, ws.id)
                    ws.closed = false

                })
        }

    } else if (msg.Status && msg.Status == 'success') {
        ws.closed = false
        if (msg.MessageId) {
            Command.changeStatus(msg.MessageId)
                .then(result => {

                    ws.closed = false
                    processPendingReceipts(ws.id)
                })
                .catch(err => {
                    Log.error(err.message, ws.id)
                    ws.closed = false
                })
            processPendingReceipts(ws.id)

        }


    } else if (msg.Status && msg.Status == 'noPaper') {
        ws.closed = false
        Log.info('NO PAPER', ws.id)
        chnageLocationStatus(ws.id, true, true)
    } else if (msg.Status && msg.Status == 'error') {
        Log.error(`${msg.MessageId } ERROR STATUS`, ws.id)
        Command.changeStatus(id, true)
            .then(result => {
                console.log('status updated')
                ws.closed = false
                processPendingReceipts(ws.id)
            })
            .catch(err => {
                Log.error(err.message, ws.id)
                ws.closed = false

            })
    }


}



function GetAllSockets() {
    return socketsInstance.getWss('/').clients
}



