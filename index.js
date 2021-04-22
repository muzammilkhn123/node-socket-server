
//----------------------------------------IMPORTS-----------------------------------------------
const server = require('http').createServer()
const io = require('socket.io')(server)
const PrintClass= require('./PrintClass')
const printClass = new PrintClass();


//----------------------------------------CONSTANTS & VARIABLES-----------------------------------------------
// Reserverd Events
let ON_CONNECTION= "connection";
let ON_DISCONNECTION= "disconnect";

// Main Events
let EVENT_IS_USER_ONLINE= "check_online";
let EVENT_SINGLE_CHAT_MESSAGE= "signle chat message";

// Sub Events
let SUB_EVENT_RECEIVE_MESSAGE= "message";
let SUB_EVENT_IS_USER_CONNECTED= "is_user_connected";

  const usersMap= new Map();
 
//----------------------------------------SOCKET SERVER-----------------------------------------------
io.on(ON_CONNECTION, function (client) {

  // console.log('client connect...', client.id);
  printClass.onConnectionPrint(client);
  
  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  client.on(SUB_EVENT_RECEIVE_MESSAGE, function name(data) {
    console.log(data);
    io.emit(SUB_EVENT_RECEIVE_MESSAGE, data)  
  })

  client.on('location', function name(data) {
    console.log(data);
    io.emit('location', data);
  })

  client.on('connect', function () {
  })

  client.on(ON_DISCONNECTION, function () {
    printClass.onDisconnectionPrint(client);
    client.removeAllListeners(ON_DISCONNECTION); 
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});