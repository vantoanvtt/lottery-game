require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    paths: {
        artifacts: "./frontend/src/artifacts"
    },
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 43112,
            gasPrice: 470000000000,
            // accounts: [{
            //         privateKey: '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba',
            //         balance: '10000000000000000000000'
            //     },
            //     {
            //         privateKey: '0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e',
            //         balance: '10000000000000000000000'
            //     }
            // ]
        },
    }
};
