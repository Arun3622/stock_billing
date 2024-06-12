import "./header.css";

function header() {
  return (
    <div className="body">
      <div className="text">
        <h2>Trading bill</h2>
      </div>
      <div className="login1">
      <h2><a href="#" className="Live"> Live</a></h2>
      <h2><a href="#" className="login">login</a></h2>
        </div>
      <div className="butten">
      <div className="Home">
          <a href="#" className="Home1">Home </a>
        </div>
        <div className="Person">
          <label>Person</label>
          <select name="name" class="select-box">
            <option>name</option>
            <option>Arun</option>
            <option>Vinit</option>
            <option>Vedansh</option>
          </select>
        </div>

        <div className="Bill">
          <label>Bill</label>
          <select name="Bill" class="select-box">
            <option>Bill</option>
            <option>weekly Bill</option>
            <option>monthly Bill</option>
          </select>
        </div>
        <div className="Ledgers">
          <label>Ledgers</label>
          <select name="Ledgers" class="select-box">
            <option>name</option>
            <option>Arun</option>
            <option>Vinit</option>
            <option>Vedansh</option>
          </select>
        </div>
        <div className="Sentbill">
          <label>Sent via</label>
          <select name="bill" class="select-box">
            <option>Whatapp</option>
            <option>SMS</option>
          </select>
        </div>
        
      </div>
      <hr />
    </div>
  );
}
export default header;
