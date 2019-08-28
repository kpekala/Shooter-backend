const io = require('../../server').io;
const db = require('../../db');
const roomsController = require('./../controllers/rooms-controller');

class SocketRouter{
    
    startListening(){
        io.on('connection', socket => {
            console.log('a user connected');
            socket.on('newPlayer', (data) =>{
                const {roomId, playerName} = data;
                roomsController.addNewPlayerToRoom(playerName,roomId);
            })
            socket.on('startGame', (data) =>{
                
            })
        });
    }
}

module.exports = new SocketRouter();