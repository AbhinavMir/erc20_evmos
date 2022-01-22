import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import genericErc20Abi from "./generic.js";

function App() {
  const [login, setLogIn] = useState(false);
  const [userAddress, setAddress] = useState("");
  const [userBal, setUserBal] = useState();
  const [rAdress, setRadress] = useState("");
  const [amt, setAmt] = useState("");

  const tokenContractAddress = "0xF0ce5bcA3597561ADEd27a2649B522E846Ab2aeF";
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    tokenContractAddress,
    genericErc20Abi,
    signer
  );
  
  const handleMetamask = async () => {
    // const { chainId } = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setLogIn(true);
    (async function () {
      let userAddress = await signer.getAddress();
      setAddress(userAddress);
      getBalance(userAddress);
    })();
  };

  async function getBalance(wallet) {
    let balance = (await contract.balanceOf(wallet)).toString();
    balance = ethers.utils.formatEther(balance);
    console.log(balance);
    setUserBal(balance);
  }

  async function sendToken() {
    const tx = await contract.transfer(rAdress, ethers.utils.parseEther(amt));
    setRadress("");
    setAmt("");
  }

  async function mintTokens() {
    await contract.mint(userAddress, 50);
  }

  return (
    <div className="container">
      <div className="mainContainer">
        {/* Black box */}
        <div className="innerContainer">
          {userBal && (
            <>
              <p style={{ fontSize: "1.2rem", margin: "0.2rem" }}>You have:</p>
              <p style={{ fontSize: "2rem", margin: "0.2rem" }}>
                {userBal}
                <span style={{ fontSize: "1rem" }}>egms</span>
              </p>
            </>
          )}

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
          {/* <form> */}
          <p>Reciever Adress</p>
          <input
            className="inputField"
            value={rAdress}
            type="text"
            onInput={(e) => setRadress(e.target.value)}
          />
          <p>Amount</p>
          <input
            value={amt}
            className="inputField"
            type="text"
            onInput={(e) => setAmt(e.target.value)}
          />
          {/* </form> */}
          {console.log(rAdress, amt)}
          <button type="submit" className="btnSubmit" onClick={sendToken}>
            Continue
          </button>
        </div>
        <button onClick={mintTokens}>Mint 50 EGMS</button>
      </div>
    </div>
  );
}
export default App;