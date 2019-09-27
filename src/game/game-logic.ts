import Player from "../model/player";
import Gun from "../model/gun";
import { numberOfMaps, numberOfGuns, gameWidth, gameHeight, blockSizeInPx, mapPositions } from "./game-utils";

export function playersWithInitialPosition(players: Array<Player>, mapId: number){
    let positions = mapPositions[mapId];
    let currentPosIndex = 0;
    for(let player of players){
        if(currentPosIndex >= positions.length){
            currentPosIndex = 0;
        }
        let playerPos = positions[currentPosIndex];
        player.x = playerPos.x;
        player.y = playerPos.y;

        currentPosIndex++;
    }
    return players;
}

export function getRandomMapId(){
    let mapId = Math.floor((Math.random() * numberOfMaps) % numberOfMaps);
    console.log(`mapId: ${mapId}`);
    return mapId;
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