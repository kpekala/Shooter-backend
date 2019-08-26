const io = require('./server').io;
const db = require('./db');

class SocketController{
    
    start(){
        io.on('connection', socket => {
            console.log('a user connected');
            socket.on('newPlayer', (data) =>{
                const {roomId, playerName} = data;
                db.addPlayer(roomId,playerName).then(() =>{
                    console.log(`new player ${data.playerName} in ${data.roomId}`);
                    io.emit(`newPlayer ${data.roomId}`,data.playerName);
                }).catch(err =>{
                    console.log(err);
                })
            })
        });
    }
}

module.exports = new SocketController();