const express = require("express")
const Blockchain = require("./blockchain.js")
const request = require("request")
const bodyParser = require("body-parser")
const PubSub = require("./publishSub.js")

const app = express();
const blockchain = new Blockchain(); //first create the object 

const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}` ;
setTimeout(() => pubsub.broadcastChain(), 1000);

//we want to get the whole blockchain data on our screen
app.use(bodyParser.json())
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain); //bc chain is a js object we have to return it by using json on our site 
})

app.post('/api/mine', (req,res) => {
    const {data} = req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/api/blocks')
}) 

//for making making nodes to run on single machine by hitting on different for rach time 
const syncChain = (req, res) => {
    request(
        { url: `${ROOT_NODE_ADDRESS}/api/blocks`},
        (error, reposnse, body) => {
          if (!error && reposnse.statusCode === 200) {
            const rootChain = JSON.parse(body);
            console.log("Replace chain on sync with", rootChain);
            blockchain.replaceChain(rootChain);
          }
        }
    );
};



let PEER_PORT;
if(process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000) //eg 3114 3000+0114 math random gave 011412... ceil after *1000
}
const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT, () => {
    console.log(`listening to PORT:${PORT}`);
    syncChain();
})
