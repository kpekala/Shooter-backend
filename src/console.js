const readline = require('readline');

class ConsoleUtils{
    constructor(){
        this.readingInterface = readline.createInterface({input: process.stdin,output: process.stdout});
    }

    onServerNeedToClose(callback){
        this.readingInterface.question('', (answer) => {
            if(answer === 'end'){
                this.readingInterface.close();
                callback();
            }
        });
    }
}

module.exports = new ConsoleUtils();