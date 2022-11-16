import './App.css';

function App() {
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

        <div className="text-style" style={{ fontSize: 30, margin: 'auto' }}>Status: 2 of 2</div>
      </div>
    </div>
  );
}

export default App;
