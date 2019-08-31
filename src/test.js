import Player from './model/player';
import Room from './model/room';
import roomsContainer from './rooms-container';

class Foo{
    onA(){
        let b = new Bar();
        b.fireA(this.a);
    }
    a(){
        console.log('it works!')
    }
}
class Bar{
    fireA(a){
        a();
    }
}
let foo = new Foo();
foo.onA();