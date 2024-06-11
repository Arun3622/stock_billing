import "./App.css";
import Header from "./header";

function App() {
  return (
    <div className="appbody">
      <Header></Header>
      <div className="box">
        <div className="text1">
          <h1>Trading details</h1>
        </div>
        <div className="inputbox">
          <div className="row">
            <label className="date">
              Date: <input name="" />
            </label>
            <label className="iteam">
              Item: <input name="" />
            </label>{" "}
            <label className="expiry">
              Expiry : <input name="" />
            </label>{" "}
            <label className="lotsize">
              Lot size: <input name="" />
            </label>{" "}
            <label className="numberlot">
              No of lot: <input name="" />
            </label>{" "}
            <label className="buyqty">
              Buy qty: <input name="" />
            </label>{" "}
            <label className="sell">
              Sell qty: <input name="" />
            </label>
            <label className="sellprice">
              Sell price: <input name="" />
            </label>
            <div className="submit1">
              <button className="submit">
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
