import Player from "../model/player";

export function playersWithInitialPosition(players: Array<Player>){
    //very basic generation of players positions.
    //Made for testing purposes
    for(let i = 0; i< players.length; i++){
        players[i].x = i* 80;
        players[i].y = 100;
    }
    return players;
}