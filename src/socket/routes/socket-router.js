const io = require('../../server').io;
const db = require('../../db');
const roomsController = require('./../controllers/rooms-controller');

class SocketRouter{
    
    listen(){
        io.on('connection', socket => {
            console.log('a user connected');
            socket.on('newPlayer', (data) =>{
                const {roomId, playerName} = data;
                roomsController.addNewPlayerToRoom(playerName,roomId);
                socket.join(roomId);
                socket.on('startGame', (data) =>{
                    io.sockets.in(roomId).emit('gameStarted',true);
                    this.listenGame(roomId, socket);
                })
            })
            
        });
    }

    listenGame(roomId, socket){

    }
}

module.exports = new SocketRouter();