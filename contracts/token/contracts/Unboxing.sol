// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "hardhat/console.sol";

/// @custom:security-contact uxname@gmail.com
contract Unboxing is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // mapping token -> probability
    mapping(uint256 => uint256) public probabilities;

    // mapping token -> isUnboxed
    mapping(uint256 => bool) public isUnboxed;

    Counters.Counter public _tokenIdCounter;

    mapping(address => bool) public admins;
    uint256 public unboxPrice = 19 ether;
    event Listn(address addr, address f);

    constructor(
        address admin_
    ) ERC721("Unboxing", "UBX") {
        admins[admin_] = true;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Only admin can call this function");
        _;
    }

    function safeMint(string memory uri, uint256 probability, address to) public onlyAdmin {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        probabilities[tokenId] = probability;
    }

    function safeMultiMint(string[] memory uris, uint256[] memory probabilities_, address to) public onlyAdmin {
        require(uris.length == probabilities_.length, "Arrays must be the same length");
        for (uint256 i = 0; i < uris.length; i++) {
            safeMint(uris[i], probabilities_[i], to);
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    // random functions

    struct Element {
        uint256 value;
        uint256 probability;
    }

    function generateRandomElement(Element[] memory elements) public view returns (uint256) {
        require(elements.length > 0, "Array must not be empty");

        uint256 totalProbability = 0;
        for (uint256 x = 0; x < elements.length; x++) {
            totalProbability += elements[x].probability;
        }

        uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % totalProbability;

        uint256 cumulativeProbability = 0;
        for (uint256 i = 0; i < elements.length; i++) {
            cumulativeProbability += elements[i].probability;
            if (randomValue < cumulativeProbability) {
//                console.log("Random value: %s", elements[i].value);
                return elements[i].value;
            }
        }

        // This should never happen, but just in case
        revert("Failed to generate random element");
    }

    function generateRandomTokenId() public view returns (uint256 tokenId) {
        // find count of non-unboxed tokens
        uint256 unboxedCount = 0;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (!isUnboxed[i]) {
                unboxedCount++;
            }
        }

        if (unboxedCount == 0) {
            revert("No more tokens to unbox");
        }

        Element[] memory elements = new Element[](unboxedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (!isUnboxed[i]) {
                elements[index] = Element(i, probabilities[i]);
                index++;
            }
        }
        return generateRandomElement(elements);
    }

    function sendRandomToken(address to) public payable onlyAdmin returns (uint256) {
        require(msg.value >= unboxPrice, "Not enough money");

        uint256 tokenId = generateRandomTokenId();
        safeTransferFrom(msg.sender, to, tokenId);
        isUnboxed[tokenId] = true;
        probabilities[tokenId] = 0;
        return tokenId;
    }

    function setAdmin(address admin_) public onlyAdmin {
        admins[admin_] = true;
    }

    function getBalance() public view onlyAdmin returns (uint256) {
        return address(this).balance;
    }

    function withdraw(address payable to, uint256 amount) public onlyAdmin {
        require(amount <= address(this).balance, "Not enough balance");
        to.transfer(amount);
    }

    function setUnboxPrice(uint256 price) public onlyAdmin {
        unboxPrice = price;
    }
}