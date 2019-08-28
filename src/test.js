class Test{
    foo(callback){
        let a = new TestDeep();
        a.takeCallback(callback);
    }
}
class TestDeep{
    takeCallback(callback){
        callback();
    }
}

let test = new Test();
test.foo(() =>{
    console.log('Hello world!')
})