import Player from './model/player';
import Room from './model/room';
import roomsContainer from './rooms-container';

class Foo{
    onA(){
        
    }
    f(){
        console.log('it works!')
    }
}
class Bar extends Foo{
    b(){
        console.log('buuu!');
    }
}
let foo = new Foo();
