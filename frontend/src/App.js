import './App.css';
import React, {useEffect, useState} from 'react'
import { ethers } from 'ethers'
import Betting from './artifacts/contracts/Betting.sol/Betting.json'

const BETTING_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function App() {

  const [totalPeople, setTotalOfPeople] = useState(0)
  const [currentPeople, setCurrentPeople] = useState(0)

  async function fetchBetting() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable get reference to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(BETTING_ADDRESS, Betting.abi, provider);

      //try to get the greeting in the contract
      try {
          const status = await contract.getStatus();
          console.log(status)
      } catch (e) {
          console.log("Err: ", e)
      }
    } else {
      console.log('undefine')
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
