## EGGMOS

This is a "meme"-coin of sorts? 
- Just an ERC20 token with uncapped mints. 
- I tried to set up an EVMOS node, but it didn't exactly workout. To not waste anymore time, I just used a public RPC. Will probably write a blog about this.
- Deployed on EVMOS Testnet (https://chainlist.org/) 
- Add `0x6aDdAd1d834D015E7eD839A15F586def146d2d2A` as contract to your Metamask. Once done, you're good to go. 
- Now visit the faucet (https://evmoserc20test.netlify.app/) and mint 50 EGMS. 
- You can transfer between accounts using your metamask or the frontend given above.
- To do the same via Golang, you can try the following in root `go run go-client/application/transferEGMS.go`
- This might give you a few errors - still in development.
- For testing, I added a simple test via Truffle and OpenZeppelin test helpers. Running `truffle test` in root should give you an idea.
- The real fun is in Fuzz testing - which I'm implementing via GoLang.

Overall - 10/10 platform, but I may be biased since I run @DocumentCosmos on Twitter.
