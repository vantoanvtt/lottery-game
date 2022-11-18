import './App.css';
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Betting from './artifacts/contracts/Betting.sol/Betting.json'
import { useParams } from 'react-router-dom';

const BETTING_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const param = useParams();
  const ethPrivkey = param.idWallet;

  const [contractBetting, setContractBetting] = useState();
  const [signer, setSiger] = useState();
  const [infoPlayer, setInfoPlayer] = useState({ player: 0, maxPlayer: 0, numberWin: 0 });

  const [value, setValue] = useState({ betNumber: '', amount: '' })

  async function fetchBetting() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable get reference to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const wallet = new ethers.Wallet(ethPrivkey, provider);
      const signers = wallet.provider.getSigner(wallet.address);
      setSiger(signers);
      const contract = new ethers.Contract(BETTING_ADDRESS, Betting.abi, signers);
      contract.on("Status", (to, amount) => {
        console.log("Status", Number(to), Number(amount));
        setInfoPlayer({ player: Number(to), maxPlayer: Number(amount) })
      });
      contract.on("WinningNumber", async (amount) => {
        console.log("WinningNumber", Number(amount));
        const total = await contract.functions.getTotalWager();
        console.log("TotalWager", Number(total));
        setInfoPlayer({ ...infoPlayer, numberWin: Number(amount) });
      });
      const status = await contract.functions.getStatus();
      console.log(status);
      setContractBetting(contract);
    } else {
      console.log('window.ethereum is undefined');
    }
  };

  useEffect(() => {
    fetchBetting();
  }, []);

  const handleBet = async () => {
    //try to get the greeting in the contract
    try {
      const bet = await contractBetting.functions.bet(Number(value.betNumber), {
          from: signer.address,
          value: ethers.utils.parseUnits(value.amount, "ether")
        });
      setValue({ betNumber: '', amount: '' })
      // console.log(contractBetting, bet);
    } catch (e) {
      console.log("Err: ", e)
    }
  }

  const handleConnectMetaMask = async () => {
    const acounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log('acounts', acounts);
  };

  const changeValue = (data) => {
    setValue({ ...value, ...data });
  }

  return (
    <div className="App">
      <div className="flex-box-column-start">
        <div className="text-style" style={{ fontSize: 30 }}>Ethereum Betting</div>

        <div style={{ padding: 10 }}></div>

        <div className="flex-box-column-center">
          <button className="bet-button" onClick={handleConnectMetaMask}>Connect Metamask</button>
        </div>

        <div style={{ padding: 10 }}></div>

        <div className="flex-box-column-center">
          <div className="text-style" style={{ fontSize: 20 }}>
            Number to wager
          </div>
          <div style={{ padding: 5 }}></div>
          <input className="input" onChange={(e) => changeValue({ betNumber: e.target.value })} />
        </div>

        <div style={{ padding: 10 }}></div>

        <div className="flex-box-column-center">
          <div className="text-style" style={{ fontSize: 20 }}>
            Number of ethers to wagers
          </div>
          <div style={{ padding: 5 }}></div>
          <input className="input" onChange={(e) => changeValue({ amount: e.target.value })} />
        </div>

        <div style={{ padding: 20 }}></div>

        <button className="bet-button" onClick={handleBet}>Bet</button>

        <div style={{ padding: 10 }}></div>

        <div className="divider"></div>

        <div style={{ padding: 10 }}></div>

        {infoPlayer.numberWin && 
          <div className="winning-number-div" >
            Winning Number is : {infoPlayer.numberWin}
          </div>
        }

        <div style={{ padding: 8 }}></div>

        <div className="text-style" style={{ fontSize: 30, margin: 'auto' }}>Status: {infoPlayer.player} of {infoPlayer.maxPlayer}</div>
      </div>
    </div>
  );
}

export default App;
