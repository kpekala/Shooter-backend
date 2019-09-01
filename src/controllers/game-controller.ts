import roomsContainer from './../rooms-container';
import * as gameLogic from './../game/game-logic';
import server from './../server'
import Player from '../model/player';
let io = server.io;

exports.onPlayerReady = (playerName: string,roomId: string) =>{
    let room = roomsContainer.getRoomById(roomId);
    room.increaseNumberOfReadyPlayers(1);

    if(room.arePlayersReady()){
        let playersWithPosition = gameLogic.playersWithInitialPosition(room.players);
        io.sockets.in(roomId).emit('startPosition', playersWithPosition);
    }
}