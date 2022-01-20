import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import genericErc20Abi from "./generic.js";

function App() {
  const [login, setLogIn] = useState(false);
  const [userAddress, setAddress] = useState("");
  const [userBal, setUserBal] = useState();
  const [rAdress, setRadress] = useState("");
  const [amt, setAmt] = useState("");

  const tokenContractAddress = "0x6aDdAd1d834D015E7eD839A15F586def146d2d2A";
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
    // var integer = parseInt(amt, 10);
    // const gweiValue = ethers.utils.formatUnits(integer, "ether");
    // console.log(gweiValue);
    // const tx = await contract.transfer(rAdress, integer);
    const tx = await contract.transfer(rAdress, ethers.utils.parseEther(amt));
    setRadress("");
    setAmt("");
    // console.log(`Transaction hash: ${tx.hash}`);
    // const receipt = await tx.wait();
    // console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    // console.log(`Gas used: ${receipt.gasUsed.toString()}`);
    // console.log(tx);
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
      </div>
    </div>
  );
}
export default App;