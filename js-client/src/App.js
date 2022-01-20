import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="mainContainer">
        {/* Black box */}
        <div className="innerContainer">
          <p style={{ fontSize: "1.2rem", margin: "0.2rem" }}>You have:</p>
          <p style={{ fontSize: "2rem", margin: "0.2rem" }}>
            10.0 <span style={{ fontSize: "1rem" }}>egms</span>
          </p>
          <button className="adress">ugduysg</button>
        </div>
        {/* Form */}
        <div className="inputContainer">
          <h2>Transfer Usdt</h2>
          <form>
            <p>Reciever Adress</p>
            <input className="inputField" type="text" />
            <p>Amount</p>
            <input className="inputField" type="text" />
          </form>
          <button type="submit" className="btnSubmit">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;