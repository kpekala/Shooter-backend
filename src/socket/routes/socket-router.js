const io = require('../../server').io;
const db = require('../../db');
const roomsController = require('./../../controllers/rooms-controller');
const gameController = require('./../../controllers/game-controller');

class SocketRouter{
    
    listen(){
        io.on('connection', socket => {
            console.log('a user connected');
            socket.on('newPlayer', (data) =>{
                const {roomId, playerName} = data;
                roomsController.addNewPlayerToRoom(playerName,roomId);
                socket.join(roomId);
                socket.on('startGame', (data) =>{
                    io.sockets.in(roomId).emit('gameStarted');
                })
                this.listenPreGame(playerName, roomId, socket);
            })
            
        });
    }

    listenPreGame(playerName, roomId, socket){
        socket.on('playerReady',(data) =>{
            console.log('player ready!')
            gameController.onPlayerReady(playerName,roomId);
            this.listenGame(socket, roomId);
        })
    }

    listenGame(socket, roomId){
        socket.on('playerUpdate',(data) => {
            io.sockets.in(roomId).emit('enemyUpdate',data);
        })
        socket.on('removedBlock', (data) =>{
            io.sockets.in(roomId).emit('removedBlock',data);
        })
        socket.on('newPlayerGun', (data) =>{
            io.sockets.in(roomId).emit('newEnemyGun',data);
        })
        socket.on('newPlayerBullet', (data) => {
            io.sockets.in(roomId).emit('newEnemyBullet',data);
        })
        socket.on('bulletRemoved', (data) => {
            io.sockets.in(roomId).emit('bulletRemoved',data);
        })
        socket.on('enemyIsHit', (data) => {
            io.sockets.in(roomId).emit('enemyIsHit',data);
        })
        socket.on('playerIsDead', (data) => {
            console.log('gotten player dead: ',data);
            io.sockets.in(roomId).emit('enemyIsDead',data);
        })
    }
}

module.exports = SocketRouter;