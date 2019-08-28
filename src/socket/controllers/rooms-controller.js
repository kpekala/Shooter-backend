const db = require('../../db');

exports.addNewPlayerToRoom = (playerName, roomId) =>{
    db.addPlayer(roomId,playerName).then(() =>{
        console.log(`new player ${data.playerName} in ${data.roomId}`);
        io.emit(`newPlayer ${data.roomId}`,data.playerName);
    }).catch(err =>{
        console.log(err);
    })
}