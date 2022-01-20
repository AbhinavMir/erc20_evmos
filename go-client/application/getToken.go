package main

import (
    "fmt"
    "log"
    "math"
    "math/big"

    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"

    token "./erc20.go"
)

func main() {
    client, err := ethclient.Dial("https://ethereum.rpc.evmos.dev")
    if err != nil {
        log.Fatal(err)
    }

    tokenAddress := common.HexToAddress("0x6aDdAd1d834D015E7eD839A15F586def146d2d2A")
    instance, err := token.NewToken(tokenAddress, client)
    if err != nil {
        log.Fatal(err)
    }

    address := common.HexToAddress("0x1f4186d627ED0fD3532470Ac8d681D3FEC2fbA11")
    bal, err := instance.BalanceOf(&bind.CallOpts{}, address)
    if err != nil {
        log.Fatal(err)
    }

    name, err := instance.Name(&bind.CallOpts{})
    if err != nil {
        log.Fatal(err)
    }

    symbol, err := instance.Symbol(&bind.CallOpts{})
    if err != nil {
        log.Fatal(err)
    }

    decimals, err := instance.Decimals(&bind.CallOpts{})
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("name: %s\n", name)         // "name: Golem Network"
    fmt.Printf("symbol: %s\n", symbol)     // "symbol: GNT"
    fmt.Printf("decimals: %v\n", decimals) // "decimals: 18"

    fmt.Printf("wei: %s\n", bal) // "wei: 74605500647408739782407023"

    fbal := new(big.Float)
    fbal.SetString(bal.String())
    value := new(big.Float).Quo(fbal, big.NewFloat(math.Pow10(int(decimals))))

    fmt.Printf("balance: %f", value) // "balance: 74605500.647409"
}