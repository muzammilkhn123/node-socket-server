
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
let EVENT_SINGLE_CHAT_MESSAGE= "single_chat_message";

// Sub Events
let SUB_EVENT_RECEIVE_MESSAGE= "receive_message";
let SUB_EVENT_IS_USER_CONNECTED= "is_user_connected";

  const usersMap= new Map();
 
//----------------------------------------HELPER FUNCTION FOR SOCKET-----------------------------------------------
function addUserToUsersMap(key_user_id,valueForUserMap){
   usersMap.set(key_user_id, valueForUserMap);
   console.log(usersMap);
}


function singleChatHandler(client,chat_message){
  printClass.printOnMessage(chat_message); 
  let receiverSocketID= getSocketIDFomMap(chat_message.ReceiverID);
  if(receiverSocketID== undefined){
    printClass.printUserNotConnected();
     chat_message.to_user_online_status=false;
     return;
  }
  chat_message.to_user_online_status=true;
  sendMessageToReceiver(client,receiverSocketID,SUB_EVENT_RECEIVE_MESSAGE,chat_message); 
} 


function sendMessageToReceiver(client,receiverSocketID,event,chat_message){
  client.to(receiverSocketID).emit(event,JSON.stringify(chat_message) );
} 


function getSocketIDFomMap(userID){
let socketIDOFUser=usersMap.get(`${userID}`)
if(socketIDOFUser == undefined){
  return undefined;
    }
return socketIDOFUser.socket_client_id;
}


//----------------------------------------SOCKET SERVER-----------------------------------------------
io.on(ON_CONNECTION, function (client) {
  printClass.onConnectionPrint(client);
  var from_user_id= client.handshake.query.from;
  let valueForUserMap= {socket_client_id:client.id};
  addUserToUsersMap(from_user_id,valueForUserMap);
  printClass.printOnlineUsersNumber(usersMap);

  
  client.on(EVENT_SINGLE_CHAT_MESSAGE, function (chat_message){
     singleChatHandler(client,chat_message)
     
    })

  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  client.on(SUB_EVENT_RECEIVE_MESSAGE, function name(data) {
     singleChatHandler(socket,chat_message); 
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