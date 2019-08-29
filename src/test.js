import Player from './model/player';
import Room from './model/room';
import roomsContainer from './rooms-container';

let player1 = new Player();
let player2 = new Player();

let room1 = new Room('asd1',[player1,player2]);
let room2 = new Room('asd2',[player1,player2]);

roomsContainer.addRoom(room1);
roomsContainer.addRoom(room2);

let room = roomsContainer.getRoomById(room1.id);
room.players = ['konradus'];

console.log(roomsContainer.getRoomById(room1.id).players)

console.log(roomsContainer.isRoomInContainer(room2));
console.log(roomsContainer.isRoomInContainer(room1));