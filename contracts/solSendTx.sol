// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSend{
    IERC20 public token;
    address public owner;
    uint public amount;
    address public recipient;

    function send(IERC20 token_, address sender_, address recipient_, uint amount_) public {
       _safeTransferFrom(token_, sender_, recipient_, amount_);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}
