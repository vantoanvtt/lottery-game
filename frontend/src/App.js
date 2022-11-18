import './App.css';
import React, {useEffect, useState} from 'react'
import { ethers } from 'ethers'
import Betting from './artifacts/contracts/Betting.sol/Betting.json'

const BETTING_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const ethPrivkey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

function App() {

  const [totalPeople, setTotalOfPeople] = useState(0);
  const [currentPeople, setCurrentPeople] = useState(0);
  const [contractBetting, setContractBetting] = useState();

  async function fetchBetting() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable get reference to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const wallet = new ethers.Wallet(ethPrivkey, provider);
      const signer = wallet.provider.getSigner(wallet.address);
      const contract = new ethers.Contract(BETTING_ADDRESS, Betting.abi, signer);
      contract.on("Status", (to, amount, from) => {
          console.log("Status", Number(to), Number(amount));
      });
      contract.on("WinningNumber", (amount) => {
          console.log("WinningNumber", Number(amount));
      });
      const status = await contract.functions.getStatus();
      console.log(status);
      setContractBetting(contract);
    } else {
      console.log('window.ethereum is undefined');
    }
  }

  useEffect(() =>  {
    fetchBetting();
  }, []);

  const handleBet = async () => {
    //try to get the greeting in the contract
    try {
      const bet = await contractBetting.functions.bet(1);
      // console.log(contractBetting, bet);
    } catch (e) {
        console.log("Err: ", e)
    }
  }

  return (
    <div className="App">
      <div className="flex-box-column-start">
        <div className="text-style" style={{ fontSize: 30 }}>Ethereum Betting</div>

        <div style={{ padding: 10 }}></div>

        <div className="flex-box-column-center">
          <div className="text-style" style={{ fontSize: 20 }}>
            Number to wager
          </div>
          <div style={{ padding: 5 }}></div>
          <input className="input" />
        </div>

        <div style={{ padding: 10 }}></div>

        <div className="flex-box-column-center">
          <div className="text-style" style={{ fontSize: 20 }}>
            Number of ethers to wagers
          </div>
          <div style={{ padding: 5 }}></div>
          <input className="input" />
        </div>

        <div style={{ padding: 20 }}></div>

        <button className="bet-button" onClick={handleBet}>Bet</button>

        <div style={{ padding: 10 }}></div>

        <div className="divider"></div>

        <div style={{ padding: 10 }}></div>

        <div className="winning-number-div" >
          Winning Number is : 1
        </div>

        <div style={{ padding: 8 }}></div>

        <div className="text-style" style={{ fontSize: 30, margin: 'auto' }}>Status: 2 of {totalPeople}</div>
      </div>
    </div>
  );
}

export default App;
