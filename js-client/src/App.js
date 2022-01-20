import "./App.css";

const amount = 100;
const address = "0x1f4186d627ED0fD3532470Ac8d681D3FEC2fbA11";
function App() {
  return (
    <div className="container">
      <div className="mainContainer">
        {/* Black box */}
        <div className="innerContainer">
          <p style={{ fontSize: "1.2rem", margin: "0.2rem" }}>You have:</p>
          <p style={{ fontSize: "2rem", margin: "0.2rem" }}>
            {amount} <span style={{ fontSize: "1rem" }}>EGMS</span>
          </p>
          <button className="adress">{address}</button>
        </div>
        {/* Form */}
        <div className="inputContainer">
          <h2>Transfer EGMS</h2>
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