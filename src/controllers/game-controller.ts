import roomsContainer from './../rooms-container';
import * as gameLogic from './../game/game-logic';
import server from './../server'
import Player from '../model/player';
let io = server.io;

exports.onPlayerReady = (playerName: string,roomId: string) =>{
    let room = roomsContainer.getRoomById(roomId);
    room.increaseNumberOfReadyPlayers(1);

    if(room.arePlayersReady()){
        let mapId = gameLogic.getRandomMapId();
        let playersWithPosition = gameLogic.playersWithInitialPosition(room.players, mapId);
        let data = {
            players: playersWithPosition,
            map: mapId
        }
        io.sockets.in(roomId).emit('initialData', data);

        let guns = gameLogic.generateGunsPostions();
        console.log('sending guns!', guns);
        io.sockets.in(roomId).emit('newGuns', guns);
    }
}