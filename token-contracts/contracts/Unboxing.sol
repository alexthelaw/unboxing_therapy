// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact uxname@gmail.com
contract Unboxing is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // mapping token -> probability
    mapping(uint256 => uint256) public probabilities;

    // mapping token -> isUnboxed
    mapping(uint256 => bool) public isUnboxed;

    Counters.Counter private _tokenIdCounter;

    constructor(
        address admin
    ) ERC721("Unboxing", "UBX") {}

    modifier onlyAdmin

    function safeMint(string memory uri, uint256 probability) public onlyAdmin {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        probabilities[tokenId] = probability;
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
        for (uint256 i = 0; i < elements.length; i++) {
            totalProbability += elements[i].probability;
        }

        uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % totalProbability;

        uint256 cumulativeProbability = 0;
        for (uint256 i = 0; i < elements.length; i++) {
            cumulativeProbability += elements[i].probability;
            if (randomValue < cumulativeProbability) {
                return elements[i].value;
            }
        }

        // This should never happen, but just in case
        revert("Failed to generate random element");
    }

    function generateRandomTokenId() public view returns (uint256) {
        Element[] memory elements = new Element[](_tokenIdCounter.current());
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            elements[i] = Element(i, probabilities[i]);
        }
        return generateRandomElement(elements);
    }

    function sendRandomToken(address to, uint256 count) public onlyAdmin returns (uint256) {
        // check msg.value >= 20 ETH
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (!isUnboxed[i]) {
                uint256 tokenId = generateRandomTokenId();
                safeTransferFrom(msg.sender, to, tokenId);
                isUnboxed[tokenId] = true;
                probabilities[tokenId] = 0;
                return tokenId;
            }
        }
        revert("No more tokens to unbox");
    }

    function withdraw() onlyAdmin {}
}