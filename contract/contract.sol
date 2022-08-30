/**
 *Submitted for verification at BscScan.com on 2022-08-07
*/

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IERC20 
{

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);


    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);


}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * Available since v3.4.
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the substraction of two unsigned integers, with an overflow flag.
     *
     * Available since v3.4.
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * Available since v3.4.
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * Available since v3.4.
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * Available since v3.4.
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
    * @dev Initializes the contract setting the deployer as the initial owner.
    */
    constructor () {
      address msgSender = _msgSender();
      _owner = msgSender;
      emit OwnershipTransferred(address(0), msgSender);
    }

    /**
    * @dev Returns the address of the current owner.
    */
    function owner() public view returns (address) {
      return _owner;
    }

    
    modifier onlyOwner() {
      require(_owner == _msgSender(), "Ownable: caller is not the owner");
      _;
    }

    function renounceOwnership() public onlyOwner {
      emit OwnershipTransferred(_owner, address(0));
      _owner = address(0);
    }

    function transferOwnership(address newOwner) public onlyOwner {
      _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
      require(newOwner != address(0), "Ownable: new owner is the zero address");
      emit OwnershipTransferred(_owner, newOwner);
      _owner = newOwner;
    }
}

abstract contract ReentrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}

contract lottory is Context, Ownable , ReentrancyGuard  {
   
   address public dev = 0x857Bf8867a41441653134500D6c6457Ee3cc1934;
   address public miner = 0xb9150107F2820930D997a91f03Ba81A8d625F337;
   uint256 public dev_fee = 4;
   uint256 public miner_fee = 26;
   address[] public players;
   address[] public players2;
   address[] public players3;
   uint256 public lotto1Balance = 0;
   uint256 public lotto2Balance = 0;
   uint256 public lotto3Balance = 0;
   uint256 public constant fixedAmount = 1000000000000000000;
  

  struct lottoTime1 {
      uint256 index;
      uint256 timestamp;
  }

   mapping(uint256 => lottoTime1) public time1Id;

    address public tokenAdress;
    IERC20 public BusdInterface;

    constructor () {
        tokenAdress = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56; 
        BusdInterface = IERC20(tokenAdress);
    }
 


// lotto 1 
    function lotto1Entry(uint256 _amount , uint256 tickets) public {
          require(_amount == fixedAmount, "you cannot deposit less or more than 1 BUSD");
         for (uint256 i = 0 ; i<tickets;i++){
          lotto1Balance = _amount + lotto1Balance;
          players.push(msg.sender);
          BusdInterface.transferFrom(msg.sender,address(this),_amount);}
   }

    function random() private view returns(uint){
       return uint256(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
      }

    function pickWinner_lotto1() public{
        
        // timer set to the contract
        require(time1Id[1].timestamp <= block.timestamp);
          uint256 index = random() % players.length;
          uint256 lotto1TimeStamp = block.timestamp + 6 hours;
          time1Id[1] = lottoTime1(1,lotto1TimeStamp);

          uint256 devFee = SafeMath.div(SafeMath.mul(lotto1Balance,dev_fee),100);
          uint256 DinoBusdFee = SafeMath.div(SafeMath.mul(lotto1Balance,miner_fee),100);
          uint256 totalFee = SafeMath.add(devFee,DinoBusdFee);
          uint256 userReward = SafeMath.sub(lotto1Balance,totalFee);
          BusdInterface.transfer(dev,devFee);
          BusdInterface.transfer(miner,DinoBusdFee);
          BusdInterface.transfer(players[index],userReward);
          lotto1Balance = 0;
          delete players;
      }


      // lotto 2

    function lotto2Entry(uint256 _amount, uint256 tickets) public {
         require(_amount == fixedAmount, "you cannot deposit less or more than 1 BUSD");
         for (uint256 i = 0 ; i<tickets;i++){ lotto2Balance = _amount + lotto2Balance;
          players2.push(msg.sender);
          BusdInterface.transferFrom(msg.sender,address(this),_amount);}
      }

    function random2() private view returns(uint){
       return uint256(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players2)));
      }

    function pickWinner_lotto2() public{

        // timer setted here as well
        require(time1Id[2].timestamp <= block.timestamp);
          uint256 index = random2() % players2.length;
            uint256 lotto1TimeStamp = block.timestamp + 12 hours;
          time1Id[3] = lottoTime1(2,lotto1TimeStamp);
          uint256 devFee = SafeMath.div(SafeMath.mul(lotto2Balance,dev_fee),100);
          uint256 DinoBusdFee = SafeMath.div(SafeMath.mul(lotto2Balance,miner_fee),100);
          uint256 totalFee = SafeMath.add(devFee,DinoBusdFee);
          uint256 userReward = SafeMath.sub(lotto2Balance,totalFee);
          BusdInterface.transfer(dev,devFee);
          BusdInterface.transfer(miner,DinoBusdFee);
          BusdInterface.transfer(players2[index],userReward);
          lotto2Balance = 0;
          delete players2;
      }

      // lotto3 

    function lotto3Entry(uint256 _amount, uint256 tickets) public {
          require(_amount == fixedAmount, "you cannot deposit less or more than 1 BUSD");
         for (uint256 i = 0 ; i<tickets;i++){lotto3Balance = _amount + lotto3Balance;
          players3.push(msg.sender);
          BusdInterface.transferFrom(msg.sender,address(this),_amount);}
      }

    function random3() private view returns(uint){
       return uint256(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players3)));
      }
        function TicketCounter(address ad) public view returns(uint256,uint256,uint256){
        uint256 lHm=0;
        uint256 lHm1=0;
        uint256 lHm2=0;
uint arrayLength = players.length;
if(arrayLength!=0){
for (uint i=0; i<arrayLength; i++) {
  // do something
  if (players[i]==ad){
      lHm++;
  }
}}
uint arrayLength1 = players2.length;
if(arrayLength1!=0){
for (uint i=0; i<arrayLength1; i++) {
  // do something
  if (players2[i]==ad){
      lHm1++;
  }}
}uint arrayLength2 = players3.length;
if(arrayLength2!=0){
for (uint i=0; i<arrayLength2; i++) {
  // do something
  if (players3[i]==ad){
      lHm2++;
  }}
}
        
        
        return (lHm,lHm1,lHm2);
    }


    function pickWinner_lotto3() public{
        // timer setted here as well
        require(time1Id[3].timestamp <= block.timestamp);
          uint256 lotto1TimeStamp = block.timestamp + 1 days;
          time1Id[3] = lottoTime1(3,lotto1TimeStamp);
          uint256 index = random3() % players3.length;
          uint256 devFee = SafeMath.div(SafeMath.mul(lotto3Balance,dev_fee),100);
          uint256 DinoBusdFee = SafeMath.div(SafeMath.mul(lotto3Balance,miner_fee),100);
          uint256 totalFee = SafeMath.add(devFee,DinoBusdFee);

          uint256 userReward = SafeMath.sub(lotto3Balance,totalFee);
          BusdInterface.transfer(dev,devFee);
          BusdInterface.transfer(miner,DinoBusdFee);
          BusdInterface.transfer(players3[index],userReward);
          lotto3Balance = 0;
          delete players3;
      }

      function RunLottery() public onlyOwner {
          uint256 time1 = block.timestamp + 6 hours;
          uint256 time2 = block.timestamp + 12 hours;
          uint256 time3 = block.timestamp + 1 days;
          time1Id[1] = lottoTime1(1,time1);
          time1Id[2] = lottoTime1(2,time2);
          time1Id[3] = lottoTime1(3,time3);
      }

}