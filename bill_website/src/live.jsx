import "./live.css";
import { useEffect, useState } from "react";
import protobuf from 'protobufjs';
import { Buffer } from 'buffer/';

const stockNames = [
  "Asian Paints Ltd", "Britannia Industries Ltd", "Cipla Ltd", "Eicher Motors Ltd",
  "Nestle India Ltd", "Grasim Industries Ltd", "Hero MotoCorp Ltd", "Hindalco Industries Ltd",
  "Hindustan Unilever Ltd", "ITC Ltd", "Larsen & Toubro Ltd", "Mahindra & Mahindra Ltd",
  "Reliance Industries Ltd", "Tata Consumer Products Ltd", "Tata Motors Ltd", "Tata Steel Ltd",
  "Wipro Ltd", "Apollo Hospitals Enterprise Ltd", "Dr Reddys Laboratories Ltd", "Titan Company Ltd",
  "State Bank of India", "Shriram Finance Ltd", "Bharat Petroleum Corporation Ltd", "Kotak Mahindra Bank Ltd",
  "Infosys Ltd", "Bajaj Finance Ltd", "Adani Enterprises Ltd", "Sun Pharmaceuticals Industries Ltd",
  "JSW Steel Ltd", "HDFC Bank Ltd", "Tata Consultancy Services Ltd", "ICICI Bank Ltd",
  "Power Grid Corporation of India Ltd", "Maruti Suzuki India Ltd", "IndusInd Bank Ltd",
  "Axis Bank Ltd", "HCL Technologies Ltd", "Oil & Natural Gas Corpn Ltd", "NTPC Ltd",
  "Coal India Ltd", "Bharti Airtel Ltd", "Tech Mahindra Ltd", "LTIMindtree Ltd",
  "Divis Laboratories Ltd", "Adani Ports & Special Economic Zone Ltd", "HDFC Life Insurance Company Ltd",
  "SBI Life Insurance Company Ltd", "UltraTech Cement Ltd", "Bajaj Auto Ltd", "Bajaj Finserv Ltd"
];

function Live() {
  const [currentStock, setCurrentStock] = useState(null);
  const [stockInput, setStockInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');

  useEffect(() => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto', (error, root) => {
      if (error) console.log(error);
      const Yaticker = root.lookupType("yaticker");

      ws.onopen = function open() {
        console.log('connected');
        if (selectedStock) {
          ws.send(JSON.stringify({
            subscribe: [selectedStock]
          }));
        }
      };

      ws.onclose = function close() {
        console.log('disconnected');
      };

      ws.onmessage = function incoming(message) {
        console.log('incoming message');
        const next = Yaticker.decode(new Buffer(message.data, 'base64'));
        setCurrentStock(next);
      };

      return () => {
        ws.close();
      };
    });
  }, [selectedStock]);

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
    setSelectedStock(stockSymbol);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const stockSymbol = stockInput.split(' ')[0];
    setSelectedStock(stockSymbol);
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
      {currentStock && <h2>Current Price: {currentStock.price}</h2>}
    </>
  );
}

export default Live;
