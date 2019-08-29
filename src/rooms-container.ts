import Room from './model/room';

class RoomsContainer{

    private rooms: Array<Room>
    constructor(){
        this.rooms = []
    }

    addRoom(room: Room){
        this.rooms.push(room);
    }

    getRoomById(roomId: string){
        for(let room of this.rooms){
            if(room.id == roomId){
                return room;
            }
        }
        throw 'Room with given id does not exist';
    }

    isRoomInContainer(room){
        return this.rooms.find(r => r.id === room.roomId) !== undefined;
    }
}

export default new RoomsContainer();