// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TreeStyle is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    IERC20 public rewardToken;

    uint256 public firstGrowthTime;

    mapping(uint256 => uint256) public tokenLvl;

    bool private tokenSet;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Tree Style", "TREE") {
        firstGrowthTime = block.timestamp + 9 days;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        require(balanceOf(to) == 0, "Only one token available");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function grow(address to, string memory uri) public {
        require(_getGrowthAmountForUser(to) > 0, "The tree has not yet grown");
        uint256 tokenId = tokenOfOwnerByIndex(to, 0);
        _setTokenURI(tokenId, uri);
    }

    function _getGrowthAmountForUser(address user) public view returns (uint256) {

    }

    // @notice Sets OXYGEN token address
    function setRewardToken(address _rewardToken) public onlyOwner {
        // require(!tokenSet, "Token already set");
        rewardToken = IERC20(_rewardToken);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

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
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}