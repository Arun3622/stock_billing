import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="body">
      <div className="text">
        <h2>Trading bill</h2> 
      </div>
      <div className="login1">
        <h2>
          <Link to="/live" className="Live">
            Live
          </Link>
        </h2>
        <h2>
          <Link to="/login" className="login">
            Login
          </Link>
        </h2>
      </div>
      <div className="butten">
        <div className="Home">
          <Link to="/" className="Home1">
            Home
          </Link>
        </div>
        <div className="Person">
          <label>Person</label>
          <select name="name" className="select-box">
            <option>name</option>
            <option>Arun</option>
            <option>Vinit</option>
            <option>Vedansh</option>
          </select>
        </div>
        <div className="Bill">
          <label>Bill</label>
          <select name="Bill" className="select-box">
            <option>Bill</option>
            <option>weekly Bill</option>
            <option>monthly Bill</option>
          </select>
        </div>
        <div className="Ledgers">
          <label>Ledgers</label>
          <select name="Ledgers" className="select-box">
            <option>name</option>
            <option>Arun</option>
            <option>Vinit</option>
            <option>Vedansh</option>
          </select>
        </div>
        <div className="Sentbill">
          <label>Sent via</label>
          <select name="bill" className="select-box">
            <option>Whatapp</option>
            <option>SMS</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
