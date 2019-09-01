import Player from "../model/player";
import Gun from "../model/gun";

let numberOfGuns = 10;
let gameWidth = 1400;
let gameHeight = 800;
const blockSizeInPx = 30;

export function playersWithInitialPosition(players: Array<Player>){
    //very basic generation of players positions.
    //Made for testing purposes
    for(let i = 0; i< players.length; i++){
        players[i].x = i* 80;
        players[i].y = 100;
    }
    return players;
}

export function generateGunsPostions(){
    let guns = [];
    for(let i=0;i<numberOfGuns; i++){
        let randomIndex = Math.floor((Math.random() * numberOfGuns) % numberOfGuns);
        let randomType = 'gun' + ((randomIndex % 5) + 1).toString();
        let pos = getRandomPos(); 
        guns.push(new Gun(pos.x, pos.y, randomType));
    }
    return guns
}
function getRandomPos(){
    let factorX = Math.floor(gameWidth / blockSizeInPx);
    let factorY = Math.floor(gameHeight / blockSizeInPx);
    let randomX = Math.floor((Math.random() * factorX) % factorX) * blockSizeInPx;
    let randomY = Math.floor((Math.random() * factorY) % factorY) * blockSizeInPx;
    return {x: randomX, y: randomY}
}