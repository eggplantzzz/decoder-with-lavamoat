require("dotenv").config();
const { forArtifact } = require("@truffle/decoder");
const Web3HttpProvider = require('web3-providers-http');
const artifactJSON = require("./MetaCoin.json");

const transaction = {
  from: '0x8d9606F90B6CA5D856A9f0867a82a645e2DfFf37',
  to: '0x18E8CFfd41B2353F62e4470Bb06809A77A0a8330',
  input: '0x90b98a11000000000000000000000000370566028c7eabda8e408da77a99eaf1e73ddc60000000000000000000000000000000000000000000000000000000000000000a',
  blockNumber: null
};

const runDecoder = async () => {
  const decoder = await forArtifact(
    artifactJSON,
    {
      projectInfo: {
        artifacts: [ artifactJSON ]
      },
      provider: new Web3HttpProvider(`https://ropsten.infura.io/v3/${process.env.infuraKey}`)
    }
  );

  const decoding = await decoder.decodeTransaction(transaction);
  return decoding;
};

runDecoder()
  .then(result => {
    console.log("the decoding is -- %o", result);
  })
  .catch(error => {
    console.log("an error -- %o", error);
  });
