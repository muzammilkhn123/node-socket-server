module.exports = class PrintClass
{

    onConnectionPrint(client){
        console.log('----------------------------------------------------------------------------------------');
        console.log("Connected => Socket ID: "+ client.id + ", User: "+ JSON.stringify(client.handshake.query));
    }

    onDisconnectionPrint(client){
        console.log('----------------------------------------------------------------------------------------');
        console.log("Disconneced => Socket ID: " + client.id);
    }
}   