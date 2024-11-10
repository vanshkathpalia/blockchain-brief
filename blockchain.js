const Block = require("./block");
const cryptoHash = require("./crypto");

class Blockchain {

    // the first element/ or block of our chain is assigned here, with prevHash = 00000... 
    constructor() {
        this.chain = [Block.genesis()];
    }

    // this function is called each time we add new block in array, actually using this function we are mining new block, generating hash by passing prevblock from code using chain and data explicitly
    addBlock({data}) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        })
        this.chain.push(newBlock);
    }

    //for consensus, we select only the largest chain
    replaceChain(chain) {
        //if smaller we exit
        
        if(chain.length <= this.chain.length ) { //this.chain is present working chain
            console.error("The incoming chain is largest");
            return;
        }
        //if longer but not a valid chain we exit
        if(!Blockchain.isValidChain(chain)) {
            console.log("This chain is not valid");
            return;
        }
        //if longer and valid, then passed new is the actual present chain now
        this.chain = chain;
    }
    //checking variour parameter to confirm either the generated block in the chain is a valid block or not
    static isValidChain(chain) {
        // checking weather at each node, we took the correct chain
        //which has correct genesis block 
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) //as the instensis are different, we can't compare these two 
            return false;

        //which has correct hash and prevhash link at each block in chain
        for (let i = 1; i < chain.length; i++) {
            const {timestamp, prevHash, hash, nonce, difficulty, data} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realHash = chain[i-1].hash;

            if (prevHash!==realHash)
                return false;
            
            //checking wheather even that passed hash value was correctly generated resp. of data timestamp and prev hash 
            //calling function defined to generate hexadecimal hash value in crypto file
            const validatedHash = cryptoHash(
                timestamp,
                prevHash,
                data,
                nonce,
                difficulty,
            );
            if (hash!==validatedHash) {
                return false;
            }
                
            if(Math.abs(lastDifficulty-difficulty)>1)//difference shouldn't be of more than 1 either it has increased or decreased
                return false; 
        }
        return true;
    }
}

// const blockchain = new Blockchain() //first create the object 
// blockchain.addBlock({data: "hello"});
// blockchain.addBlock({data: "world"});
// const result = Blockchain.isValidChain(blockchain)

// console.log("correct");
// console.log(blockchain);

module.exports = Blockchain;