const {GENESIS_BLOCK, MINE_RATE} = require("./config.js");
const hexToBinary = require ("hex-to-binary");
//this function name should be same as exports in file 
const cryptoHash = require("./crypto.js");

class Block {
    constructor({timestamp, hash, prevHash, data, nonce, difficulty}) { //this is object
        this.timestamp = timestamp;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty
    }

    //we CALL this function each time we need genesis block anywhere in the code 
    static genesis() {
        return new this(GENESIS_BLOCK);
    }

    // mineblock take two arguments, prevblock and data explicitly by user and by code pass after converting value for timestamp and hash, hash with prevhash from pervblock and data and timestamp
    //difficulty is used here
    static mineBlock({ prevBlock, data }) { 
        //initialising this on top is necessary otherwise problem in while loop
        let hash, timestamp;
        //we pass the desired block to be our prev block
        const prevHash = prevBlock.hash;
        //didn't understand this 
        //ig we extract difficulty from prevblock
        //we did this same thing in isvalidblock
        let { difficulty } = prevBlock


        let nonce = 0;
        //we exist as soon as initial digit of hash are of some 0 initially which is equal to difficulty no 
        // hash = 00e32
        // difficulty = 2 -> valid
        do {
            nonce++;
            timestamp = Date.now();
            //we are check at creating each nonce, if finding that nonce has taken more than 1 sec we dec the difficulty
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp,
            })
            //if nonce is changing hash is also changing
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty)
        } while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)) 
            //we checked in hash till hash[0] to difficulty no is 0 or not
            //we repeat 0 till difficulty times in hexa decimal number
            //in bitcoin bit value is used but we are using hexa decimal for your code
        return new this ({
            timestamp,
            prevHash,
            data,
            nonce, 
            difficulty,
            //as we have executed cryptohash function for hash prev only
            hash,
        });
    }
     
    //in blockchain it is of 10 mins, but for our code it is less
    static adjustDifficulty({originalBlock, timestamp}) {
        
        //extracting diff. from present block
        const { difficulty } =  originalBlock;
        // console.log(difficulty);
        
        if (difficulty < 1) return 1;

        const difference = timestamp-originalBlock.timestamp;
        // console.log(difference);
        
        //if getting tough taking more time than 1 sec -> dec difficulty
        if(difference > MINE_RATE) {
            return difficulty - 1;
        }      //if easy, inc
        else {
            return difficulty + 1;
        }
    }
}

const block1 = new Block({
    hash: "0xacb",
    timestamp: "2/09/22",
    prevHash: "0xc12",
    data: "hello",
  });

module.exports = Block;

//random knowledge about passing in object vs in array...

// as we have passed parameter in const. as object, we can pass parameter jumbly, like...
// const block1 = new Block({timestamp: "27/08/2024", hash: "23e9a", prevHash: "44cce3", data: "hello world"});
// the upper one was correct
// lower ones are incorrect
// const block2 = new Block(hash = "44ce3", timestamp = "27/08/2024", prevHash = "74fe3", data = "world");
// now this will always give undefined because now that's an object... 
// const block3 = new Block(hash = "44ca3", timestamp = "28/08/2024", prevHash = "94fe3", data = "hello");

// mined block using crypto hexadecimal hash
// const block4 = Block.mineBlock({prevBlock: block1, data: "yo"});

// console.log(block1);
// console.log(block2);
// console.log(block3);

// console.log(block4);

// const genesisData = Block.genesis();
// console.log(genesisData);

