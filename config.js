//here even if we add keys non sequencewise, they will still be found, because object
const MINE_RATE = 1000; //minisecond
const INITIAL_DIFFICULTY = 4;
const GENESIS_BLOCK = {
    timestamp: 1,
    hash: "32eb3",
    prevHash: "000000000",
    data: "nothing",
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY,
} 
module.exports = {GENESIS_BLOCK, MINE_RATE};