import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
function App() {
  const [login, setLogIn] = useState(false);
  const [userAddress, setAddress] = useState([]);

  const handleMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const { chainId } = await provider.getNetwork()
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setLogIn(true);

    (async function () {
      let userAddress = await signer.getAddress();
      setAddress(userAddress);
    })();
  };

  const sendTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x6aDdAd1d834D015E7eD839A15F586def146d2d2A"
    );

    const tx = await contract.send("transfer", []);
    
  }

  return (
    <div className="container">
      <div className="mainContainer">
        {/* Black box */}
        <div className="innerContainer">
          <p style={{ fontSize: "1.2rem", margin: "0.2rem" }}>You have:</p>
          <p style={{ fontSize: "2rem", margin: "0.2rem" }}>
            10.0 <span style={{ fontSize: "1rem" }}>egms</span>
          </p>
          {login ? (
            <p className="adress2">{userAddress}</p>
          ) : (
            <button className="adress" onClick={handleMetamask}>
              Connect to Metamask
            </button>
          )}
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