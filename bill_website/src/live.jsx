import "./live.css";
import { useEffect, useState } from "react";
import protobuf from 'protobufjs';
import { Buffer } from 'buffer/';

const stockNames = [
  "ASIANPAINT.NS", "BRITANNIA.NS", "CIPLA.NS", "EICHERMOT.NS", "NESTLEIND.NS", "GRASIM.NS", "HEROMOTOCO.NS", "HINDALCO.NS",
  "HINDUNILVR.NS", "ITC.NS", "LT.NS", "M&M.NS", "RELIANCE.NS", 
  "TATACONSUM.NS", "TATAMOTORS.NS", "TATASTEEL.NS", "WIPRO.NS",
  "APOLLOHOSP.NS", "DRREDDY.NS", "TITAN.NS", "SBIN.NS", 
  "SHRIRAMFIN.NS", "BPCL.NS", "KOTAKBANK.NS", "INFY.NS", 
  "BAJFINANCE.NS", "ADANIENT.NS", "SUNPHARMA.NS", "JSWSTEEL.NS", 
  "HDFCBANK.NS", "TCS.NS", "ICICIBANK.NS", "POWERGRID.NS", 
  "MARUTI.NS", "INDUSINDBK.NS", "AXISBANK.NS", "HCLTECH.NS", 
  "ONGC.NS", "NTPC.NS", "COALINDIA.NS", "BHARTIARTL.NS", 
  "TECHM.NS", "LTIM.NS", "DIVISLAB.NS", "ADANIPORTS.NS", 
  "HDFCLIFE.NS", "SBILIFE.NS", "ULTRACEMCO.NS", "BAJAJ-AUTO.NS", 
  "BAJAJFINSV.NS","NFLX","CCL","ADBE","KAVL","D","^NSEBANK"
];

function Live() {
  const [currentStocks, setCurrentStocks] = useState({});
  const [stockInput, setStockInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [subscribedStocks, setSubscribedStocks] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto', (error, root) => {
      if (error) console.log(error);
      const Yaticker = root.lookupType("yaticker");

      ws.onopen = function open() {
        console.log('connected');
        if (subscribedStocks.length > 0) {
          ws.send(JSON.stringify({
            subscribe: subscribedStocks
          }));
        }
      };

      ws.onclose = function close() {
        console.log('disconnected');
      };

      ws.onmessage = function incoming(message) {
        console.log('incoming message');
        const next = Yaticker.decode(new Buffer(message.data, 'base64'));
        setCurrentStocks(prevStocks => ({
          ...prevStocks,
          [next.id]: next
        }));
      };

      return () => {
        ws.close();
      };
    });
  }, [subscribedStocks]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setStockInput(value);
    if (value) {
      const filteredSuggestions = stockNames.filter(stock =>
        stock.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setStockInput(suggestion);
    setSuggestions([]);
    const stockSymbol = suggestion.split(' ')[0];
    if (!subscribedStocks.includes(stockSymbol)) {
      setSubscribedStocks([...subscribedStocks, stockSymbol]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const stockSymbol = stockInput.split(' ')[0];
    if (!subscribedStocks.includes(stockSymbol)) {
      setSubscribedStocks([...subscribedStocks, stockSymbol]);
    }
  };

  return (
    <>
      <h1>Market is open ❤️</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="stock-input">Enter stock name:</label>
        <input
          type="text"
          id="stock-input"
          value={stockInput}
          onChange={handleInputChange}
        />
        <button type="submit">Subscribe</button>
      </form>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div className="stock-container">
        {Object.keys(currentStocks).map(stockId => (
          <div key={stockId} className="stock-box">
            <h2>{stockId}</h2>
            <p>Current Price: {currentStocks[stockId].price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Live;
