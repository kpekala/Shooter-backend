const server = require('./../server');
var db = require('./../db');
const io = server.io;

import roomsContainer from './../rooms-container';
import Room from '../model/room';
import Player from '../model/player';

exports.addMessage = (req,res) =>{
    const roomId = req.params.roomId;
    const message = req.body.message;
    db.addMessage(roomId, message).then(() =>{
        io.emit(`messages ${roomId}`,message);
        res.sendStatus(200);
        console.log(`messages ${roomId}`);
    }).catch(err =>{
        console.log('addMessage: '+ err);
        res.sendStatus(304);
    })
}

exports.getMessages = (req,res) =>{
    const roomId = req.params.roomId;
    db.getMessages(roomId)
    .then(messages => messages === undefined ? [] : messages)
    .then(messages =>{
        res.send(messages);
        console.log('messages to send: ' + messages);
    }).catch(reason =>{
        console.log(reason);
    })
}

exports.getRooms = (req,res) =>{
    db.getRooms().then((rooms) =>{
        res.send(rooms);
    })
}

exports.addRoom = (req,res) =>{
    const roomName = req.body.roomName;
    
    db.addRoom(roomName).then((room)=> {
        console.log('adding room succes!');
        let roomModel = new Room(room._id,[]);
        roomsContainer.addRoom(roomModel);
        io.emit('new room', room);
        res.sendStatus(200);
    })
}

exports.getPlayers = (req,res) =>{
    const roomId = req.params.roomId;

    db.getPlayers(roomId).then(players =>{
        res.send(players);
    })
}

exports.addNewPlayerToRoom = (playerName, roomId) =>{
    db.addPlayer(roomId,playerName).then(() =>{
        let room = roomsContainer.getRoomById(roomId);
        room.players.push(new Player(playerName));
        io.emit(`newPlayer ${roomId}`,playerName);
        console.log(`new player ${playerName} in ${roomId}`);
    }).catch(err =>{
        console.log(err);
    })
}