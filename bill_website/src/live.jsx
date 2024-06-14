import "./live.css";
import { useEffect , useState} from "react"
// import StockInfo from "./component/stockInfo";
import protobuf from 'protobufjs'
import  { Buffer } from 'buffer/';
function Live() {
  const [currentStock , setCurrentStock] = useState(null)
  useEffect(() => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto', (error, root) => {
      if(error)
        console.log(error)
      const Yaticker = root.lookupType("yaticker");
      ws.onopen = function open() {
        console.log('connected');
        ws.send(JSON.stringify({
          subscribe: ['TSL']
        }));
      };

      ws.onclose = function close() {
        console.log('discoTSLActed');
      };

      ws.onmessage = function incoming(message) {
        console.log('comming message')
        const next = Yaticker.decode(new Buffer(message.data, 'base64'));
        setCurrentStock(next)
      };
    });

  }, [])
  return (
    <>
      <h1>market is close 🫡 </h1>
      {currentStock && <h2>{currentStock.price}</h2>}
      {/* <StockInfo/> */}
    </>
  );
}

export default Live;
