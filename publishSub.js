const redis = require("redis");
// const Blockchain = require("./blockchain")
const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
}

//we have passed our full blockchain in this constructor 
class PubSub {
    constructor({blockchain}){ 
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        // this.call();
        //whenever any of the channels are subscribed using any of the function (here through broadcast), this event is triggered
        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        //once event is triggered this functionality is performed
        //here we take the message (here the full blockchain) passed and channel (blockchain) detail and use those in handleMessage function
        this.subscriber.on("message", (channel, message) => 
             this.handleMessage(channel, message)
        )
    }
        // call() {
        //     console.log(this.blockchain.chain);
            
        // }

        //this function is taking the message, converting json to test or test to json, checking this channel is blockchain channel because same handling for test channel too, if yes, checking either this time the passed chain is longer or not
        handleMessage(channel, message) {
            console.log((`Message recieved. Channel: ${channel} Message: ${message}`));
            const parseMessage = JSON.parse(message)
            if (channel === CHANNELS.BLOCKCHAIN) {
                    this.blockchain.replaceChain(parseMessage)
            }
        }

        //this channel is subscribing into the channel ??
        //this is actually publishing a channel 
        publish({ channel, message }) {
            this.publisher.publish(channel, message)
        }
       
        //this function is 
        broadcastChain() {
            //calling function which will contact to redis for subscribing
            //we are basically publishing a msg on behave of the subscriber
            
            this.publish({
                channel: CHANNELS.BLOCKCHAIN,
                message: JSON.stringify(this.blockchain.chain),
            })
        }
}

        


// const checkPubSub = new PubSub();
// setTimeout(
//     () => checkPubSub.publisher.publish(CHANNELS.TEST, "HELLO"), 1000
// );

module.exports = PubSub;



// const redis = require("redis");

// const CHANNELS = {
//   TEST: "TEST",
//   BLOCKCHAIN: "BLOCKCHAIN",
// };
// class PubSub {
//   constructor({ blockchain }) {
//     this.blockchain = blockchain;
//     this.publisher = redis.createClient();
//     this.subscriber = redis.createClient();

//     this.subscriber.subscribe(CHANNELS.TEST);
//     this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

//     this.subscriber.on("message", (channel, message) =>
//       this.handleMessage(channel, message)
//     );
//   }
//   handleMessage(channel, message) {
//     console.log(`Message recieved.Channel: ${channel} Message:${message}`);
//     const parseMessage = JSON.parse(message);

//     if (channel === CHANNELS.BLOCKCHAIN) {
//       this.blockchain.replaceChain(parseMessage);
//     }
//   }
//   publish({ channel, message }) {
//     this.publisher.publish(channel, message);
//   }
//   broadcastChain() {
//     this.publish({
//       channel: CHANNELS.BLOCKCHAIN,
//       message: JSON.stringify(this.blockchain),
//     });
//   }
// }

// // const checkPubSub = new PubSub();
// // setTimeout(
// //   () => checkPubSub.publisher.publish(CHANNELS.TEST, "Hellloooo"),
// //   1000
// // );
// module.exports = PubSub;