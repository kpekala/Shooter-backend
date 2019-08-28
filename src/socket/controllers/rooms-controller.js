const db = require('../../db');
const io = require('../../server').io;

exports.addNewPlayerToRoom = (playerName, roomId) =>{
    db.addPlayer(roomId,playerName).then(() =>{
        console.log(`new player ${playerName} in ${roomId}`);
        io.emit(`newPlayer ${roomId}`,playerName);
    }).catch(err =>{
        console.log(err);
    })
}