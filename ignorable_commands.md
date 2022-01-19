solc --abi erc20.sol
abigen --abi=erc20_sol_ERC20.abi --pkg=token --out=erc20.go

go get -u github.com/ethereum/go-ethereum
cd /Users/abhinavmir/go/src/github.com/ethereum/go-ethereum/
make
make devtools