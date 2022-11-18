require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    paths: {
        artifacts: "./frontend/src/artifacts"
    },
    solidity: "0.8.17",
    networks: {
        hardhat: {
            gasPrice: 470000000000,
            chainId: 43112,
        },
    }
};
