const server = require('../../server.js');
var db = require('../../db.js');
const io = server.io;

exports.addMessage = (req,res) =>{
    const roomId = req.params.roomId;
    const message = req.body.message;
    db.addMessage(roomId, message).then(() =>{
        console.log(`messages ${roomId}`);
        io.emit(`messages ${roomId}`,message);
        res.sendStatus(200);
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