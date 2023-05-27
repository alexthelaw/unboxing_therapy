// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


contract Test {
    uint256 public counter = 0;


    function _incriment() internal {
        counter++;
    }

    function incrimentFree() external {
        _incriment();
    }

    function incriment() external payable {
        _incriment();
    }

}