module.exports = class PrintClass
{

    onConnectionPrint(client){
        console.log('\n-------------------------------------------------------------------------------------------------');
        console.log("Connected => Socket ID: "+ client.id + ", User: "+ JSON.stringify(client.handshake.query));
    }

    onDisconnectionPrint(client){
        console.log('\n-------------------------------------------------------------------------------------------------');
        console.log("Disconneced => Socket ID: " + client.id);
    }

    printOnlineUsersNumber(usersMap){
        console.log('-------------------------------------------------------------------------------------------------');
        console.log("Users Online: " + usersMap.size);

    }
    printOnMessage(chat_message){
        console.log('-------------------------------------------------------------------------------------------------');
        console.log("On Message: " + JSON.stringify(chat_message));
        let receiverID= chat_message.ReceiverID;
     let senderID= chat_message.senderID;
     console.log("Sender: "+senderID +"|| Receiver: " +receiverID  );

    }
    printUserNotConnected(){
        console.log('-------------------------------------------------------------------------------------------------');
        console.log("Chat User Not Connected");
    }
}   