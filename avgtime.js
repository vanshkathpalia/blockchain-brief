const Blockchain = require('./blockchain')
const blockchain = new Blockchain()

//here for there 100 block we create totally different chain 
//for removing the confusion created by genesis block timestamp
// block-chain[0]
blockchain.addBlock({ data: "new block"});


//now we are at block-chain[2]
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = [];

for (let i = 0; i < 1000; i++) {
    //existing chain me se prev block ka timestamp liya
    //now accessing values from chain[0]
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    //ek or nya block bnaya or wo add kiya chain me
    //blockchain[1]
    blockchain.addBlock({data: `block ${i}`});
    //ab us nye block ka timestamp liya, 
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;

    timeDiff = nextTimestamp - prevTimestamp;

    //what is times -> list of all the timediff
    times.push(timeDiff);

    //what is this doing ?? -> stl for average, reduce for calculating sum of all element of array times and then divided by its length to get average
    averageTime = times.reduce((total, num) => total+num)/times.length;

    console.log(`Time to mine the block: ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, Average time: ${averageTime}ms`);
}
