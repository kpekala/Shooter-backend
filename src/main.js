const consoleUtils = require('./console.js');
const db = require('./db.js');
const server = require('./server');
const port = require('./utils').port;
const SocketRouter = require('./socket/routes/socket-router');
const socketRouter = new SocketRouter();

db.connect().then(() =>{
    startListening();
}).catch((err) =>{
    console.log('catched: ' + err);
    console.log('Kurwa byku odpal mondodb');
    process.exit(0);
})

function startListening(){
    socketRouter.listen();
      
    server.httpServer.listen(port, () => {
        console.log('listening on ' + port);
    });
    
    consoleUtils.onServerNeedToClose(()=> {
        console.log('server went down!');
        server.close();
        db.close();
        process.exit(0);
    })
}

