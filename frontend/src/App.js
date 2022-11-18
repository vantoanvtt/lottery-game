import './App.css';
import React, {useEffect, useState} from 'react'
import { ethers } from 'ethers'
import Betting from './artifacts/contracts/Betting.sol/Betting.json'

const BETTING_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ethPrivkey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

function App() {

  const [totalPeople, setTotalOfPeople] = useState(0)
  const [currentPeople, setCurrentPeople] = useState(0)

  async function fetchBetting() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable get reference to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance("ethers.eth");
      console.log("balance", ethers.utils.formatEther(balance));
      const wallet = new ethers.Wallet(ethPrivkey, provider);
      console.log(wallet);
      const signer = wallet.provider.getSigner(wallet.address);
      const contract = new ethers.Contract(BETTING_ADDRESS, Betting.abi, signer);

      //try to get the greeting in the contract
      try {
          const bet = await contract.bet(10);
          console.log(bet);
      } catch (e) {
          console.log("Err: ", e)
      }
    } else {
      console.log('window.ethereum is undefined');
    }
  }

  useEffect(() =>  {
    fetchBetting();
  }, [])

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

        <button className="bet-button">Bet</button>

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
