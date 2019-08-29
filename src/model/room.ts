import Player from './player'

export default class Room{
    players: Array<Player>;
    id: string;
    numberOfReadyPlayers: number

    constructor(roomId: string, players: Array<Player>){
        this.players = players;
        this.id = roomId;
        this.numberOfReadyPlayers = 0;
    }

    arePlayersReady = () => this.numberOfReadyPlayers == this.players.length;

    increaseNumberOfReadyPlayers(number){
        this.numberOfReadyPlayers += number;
    }
}
