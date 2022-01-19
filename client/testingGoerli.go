package main

import (
    "context"
    "crypto/ecdsa"
    "fmt"
    "log"
    "math/big"

    "golang.org/x/crypto/sha3"
    // "github.com/ethereum/go-ethereum"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/common/hexutil"
    "github.com/ethereum/go-ethereum/core/types"
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/ethereum/go-ethereum/ethclient"
    "os"
)

func main() {
    client, err := ethclient.Dial("https://rpc.goerli.mudit.blog/")
    if err != nil {
        log.Fatal(err)
    }

    privateKey, err := crypto.HexToECDSA(os.Getenv("PRIVATE_KEY"))
    if err != nil {
        log.Fatal(err)
    }

    publicKey := privateKey.Public()
    publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
    if !ok {
        log.Fatal("cannot assert type: publicKey is not of type *ecdsa.PublicKey")
    }

    fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
    nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
    if err != nil {
        log.Fatal(err)
    }

    value := big.NewInt(50) // in wei (0 eth)
    gasPrice, err := client.SuggestGasPrice(context.Background())
    if err != nil {
        log.Fatal(err)
    }

    var toAddressString string;
    fmt.Scanln(&toAddressString)
    toAddress := common.HexToAddress(toAddressString)
    tokenAddress := common.HexToAddress("0x6e60e7A538F4c95ED7f8c8A7b94637a29f2d0FBe")

    transferFnSignature := []byte("transfer(address,uint256)")
    hash := sha3.NewLegacyKeccak256()
    hash.Write(transferFnSignature)
    methodID := hash.Sum(nil)[:4]
    fmt.Println(hexutil.Encode(methodID)) // 0xa9059cbb

    paddedAddress := common.LeftPadBytes(toAddress.Bytes(), 32)
    // fmt.Println(hexutil.Encode(paddedAddress)) 

    amount := new(big.Int)
    amount.SetString("1000000000000000000000", 18) // sets the value to 1000 tokens, in the token denomination

    paddedAmount := common.LeftPadBytes(amount.Bytes(), 32)
    // fmt.Println(hexutil.Encode(paddedAmount))

    var data []byte
    data = append(data, methodID...)
    data = append(data, paddedAddress...)
    data = append(data, paddedAmount...)

    gasLimit := uint64(240000)
    
    if err != nil {
        log.Fatal(err)
    }
    // fmt.Println(gasLimit)

    tx := types.NewTransaction(nonce, tokenAddress, value, gasLimit, gasPrice, data)

    chainID, err := client.NetworkID(context.Background())
    if err != nil {
        log.Fatal(err)
    }

    signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)
    if err != nil {
        log.Fatal(err)
    }

    err = client.SendTransaction(context.Background(), signedTx)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Amt sent: 50 EGMS from %s to %s", fromAddress, toAddressString) 
}
