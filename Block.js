// Block chain is a chain of blocks.
// Each block will has his own hash key to encrypt its data.
// It also has hash of the previous block to connect
// It also contains its own data

const HasherHelper = require("crypto-js/sha256");

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = new Date();

    // Encrypt hash of previous block, its own data and time
    // Using hash will avoid of data manipulation
    this.hash = this.calculateHash();
    this.mineVar = 0;
  }

  calculateHash() {
    return HasherHelper(
      this.prevHash + JSON.stringify(this.data) + this.timeStamp // + this.mineVar
    ).toString();
  }

  // mine() {
  //   while (!this.HasherHelper().startsWith("0000")) {
  //     this.mineVar++;
  //     this.hash = this.calculateHash();
  //   }
  // }
}

// const block = new Block("", { hello: "world" });

// console.log(block);

// Create a blockchain by connecting different blocks
class Blockchain {
  constructor() {
    // Create first block
    const genesisBlock = new Block("0000", { isGenesis: true });
    this.chain = [genesisBlock];
  }

  // Get the last Block of the chain
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    // get last block
    const lastBlock = this.getLastBlock();

    // create new block
    const newBlock = new Block(lastBlock.hash, data);
    // newBlock.mine();

    // add new block to the chain
    this.chain.push(newBlock);
  }

  // check if data is manipulated ?
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      // check if hash of current block is consistent with hash from data
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // check if hash of current block is consistent with hash of previous block
      if (currentBlock.hash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

const newChain = new Blockchain();

newChain.addBlock({ from: "Tam", to: "Totoro", amount: "200" });
newChain.addBlock({ from: "Tam", to: "Pooh", amount: "100" });

// console.log(newChain);
console.log(newChain.chain);
console.log(newChain.isValid());
