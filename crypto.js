const crypto = require("crypto");
const hexToBinary = require("hex-to-binary")
// please keep in mind about the "" and the spelling sha256 was in ""
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash("sha256");
    hash.update(inputs.join(""));
    return (hash.digest("hex"));
    //hexadecimal no is returned as binary no in the main code while mining or adding new block
};

// const result = cryptoHash ("hello");
// console.log (result);

// here cry... is a function so exported as this 
// otherwise would have been like... {cyr...}, if was only a varible, just like we did it for genesis block
module.exports = cryptoHash;