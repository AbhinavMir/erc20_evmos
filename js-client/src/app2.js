import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [login, setLogIn] = useState(false);
  const [userAddress, setAddress] = useState("");
  const [userBal, setUserBal] = useState(0);
  const tokenContractAddress = "0x6aDdAd1d834D015E7eD839A15F586def146d2d2A";
  const genericErc20Abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

  const handleMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const { chainId } = await provider.getNetwork();
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
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // let balance = await provider.getBalance(wallet);
    // we use the code below to convert the balance from wei to eth
    const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
    let balance = (await contract.balanceOf(wallet)).toString();
    balance = ethers.utils.formatEther(balance);
    console.log(balance);
    setUserBal(balance);
  }

  async function sendToken(address, amount) {
    const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, signer);
    const tx = await contract.transfer(address, amount);
    console.log(tx);
  }

  return (
    <div className="container">
      <div className="mainContainer">
        {/* Black box */}
        <div className="innerContainer">
          <p style={{ fontSize: "1.2rem", margin: "0.2rem" }}>You have:</p>
          <p style={{ fontSize: "2rem", margin: "0.2rem" }}>
            {userBal}
            <span style={{ fontSize: "1rem" }}>EGMS</span>
          </p>
          {login ? (
            <p className="adress2">{userAddress}</p>
          ) : (
            <button className="address" onClick={handleMetamask}>
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
          <button type="submit" className="btnSubmit" onClick = {sendToken("0xB47E50B7B67971713f80eC7Ec26332f18a7CF738", 50)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;