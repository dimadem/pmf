// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./OxygenToken.sol";

// TreeStyle 0x8EA3291b689275b80ee347E99D484736d5b9086E
// Oxygen 0xCb966524d5344eA5C1D98e9229AE1EFf590bDc08

contract TreeStyle is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    OxygenToken public rewardToken;

    uint256 public immutable firstGrowthTime;
    uint256 public immutable endTime;
    uint256 public constant MONTH = 30; //value for testing
    uint256 public constant MIN_COST = 0.001 ether; //value for testing

    mapping(uint256 => uint256) public tokenLvl;
    mapping(address => uint256) public growthsDone;

    bool private tokenSet;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Tree Style", "TREE") {
        firstGrowthTime = block.timestamp + 10; //value for testing
        endTime = block.timestamp + 12 * MONTH;
    }

    modifier hasToken() {
        require(balanceOf(msg.sender) > 0, "User has no tree");
        _;
    }

    function safeMint(address to, string memory uri) public payable {
        require(balanceOf(to) == 0, "Only one token available");
        require(msg.value >= MIN_COST, "Not enough ETH");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    
    //@notice Tree growth one time
    //@dev Consider add growths multiple times
    //@dev Func must be called only from frontend with specific tokenURI
    function grow(string memory uri) public hasToken {
        require(_availableUserGrowths(msg.sender) > 0, "The tree has not yet grown");
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, 0);
        growthsDone[msg.sender]++;
        tokenLvl[tokenId]++;
        _setTokenURI(tokenId, uri);
    }

    //@notice Get number of available growths
    function _availableUserGrowths(address user) public view returns (uint256) {
        require(block.timestamp >= firstGrowthTime, "No growth yet");
        if (block.timestamp > endTime) return 12 - growthsDone[user];
        uint256 allGrothws = 1 + (block.timestamp - firstGrowthTime) / MONTH;
        return allGrothws - growthsDone[user];
    }

    //@notice Mint 1 reward token to user and burn tree
    //@dev Consider minting some tokens each month
    function getOxygen() public hasToken {
        require(block.timestamp > endTime, "Not available yet");
        require(growthsDone[msg.sender] == 12, "The tree has not grown enough yet");
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, 0);
        _burn(tokenId);
        rewardToken.mint(msg.sender, 1);
    }

    // @notice Sets reward token address
    function setRewardToken(address _rewardToken) public onlyOwner {
        // require(!tokenSet, "Token already set");
        rewardToken = OxygenToken(_rewardToken);
    }

    //dev must be changed later. Sets for tesing
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity. 

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {   
        require(from == address(0) || to == address(0), "Transfer not allowed");
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