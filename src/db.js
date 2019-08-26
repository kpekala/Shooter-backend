const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


class DatabaseHandler{
    constructor(dbName, dbUrl){
        this.dbName = dbName;
        this.dbClient = new MongoClient(dbUrl);
    }

    close(){
        this.dbClient.close();
    }
    connect(){
        const promise = new Promise((resolve,reject) => {
            this.dbClient.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    this.db = this.dbClient.db(this.dbName);
                    resolve('connected to database!');
                }
            });
        })
        return promise;
    }

    addRoom(roomName){
        const collection = this.db.collection('rooms');

        const room = {
            roomName: roomName,
            messages: [],
            _id: new ObjectId()
        };

        return new Promise((resolve,reject) => {
            collection.insert(room, (err, result) => {
                if(err){
                    console.log(err);
                    reject();
                }else{
                    resolve(room);
                }
            })
        });
    }

    getRooms(){
        const collection = this.db.collection('rooms');

        return new Promise((resolve,reject) => {
            collection.find({}).toArray((err, docs) => {
                if(err){
                    reject(err);
                }else{
                    resolve(docs);
                }
            })
        })
    }

    async getMessages(roomId){
        const collection = this.db.collection('rooms')

        const room = await collection.find({_id: ObjectId(roomId)}).next();
        return room.messages;
    }

    async addMessage(roomId, message){
        const collection = this.db.collection('rooms')

        const result = await collection.updateOne({_id: ObjectId(roomId)},{
            $push: {messages: message}
        })
        if(result.modifiedCount === 0){
            throw 'not updated!';
        }
    }

    async addPlayer(roomId, playerName){
        const collection = this.db.collection('rooms');
        const result = await collection.updateOne({_id: ObjectId(roomId)},{
            $addToSet: {players: playerName}
        })
        if(result.modifiedCount === 0){
            throw 'player exists!'
        }
    }

    async getPlayers(roomId){
        const collection = this.db.collection('rooms')

        const room = await collection.find({_id: ObjectId(roomId)}).next();
        return room.players;
    }

    dispose(){
        this.dbClient.close();
    }

}  

module.exports = new DatabaseHandler('strzelanka','mongodb://localhost:27017');