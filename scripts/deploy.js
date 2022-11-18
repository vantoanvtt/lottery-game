const hre = require("hardhat");

const main = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const bettingContractFactory = await hre.ethers.getContractFactory("Betting");
    const bettingContract = await bettingContractFactory.deploy(1);
    await bettingContract.deployed();

    console.log("WavePortal address: ", bettingContract.address);
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
