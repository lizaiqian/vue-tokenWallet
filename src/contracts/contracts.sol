pragma solidity ^0.4.0;

pragma solidity ^0.4.24;

//version controll
contract ContractVersion {

  address manager;
  address currentAddress;

  mapping(string => address) versions;

  modifier onlyManager() {
    require(msg.sender == manager);
    _;
  }

  constructor() public {
    manager = msg.sender;
  }

  function getManager() public view returns(address) {
    return manager;
  }

  function deploy(string _version) public onlyManager{
    address newContract = new ParrentAddress(msg.sender);
    versions[_version] = newContract;
    setCurrentVersion(_version);
  }

  function setCurrentVersion(string _version) internal {
    currentAddress = versions[_version];
  }

  function getAddressOf(string _version) public view returns(address) {
    return versions[_version];
  }

  function getCurrentAddress() public view returns(address) {
    return currentAddress;
  }

}


//parrent address
contract ParrentAddress {

  mapping(address => uint) balanceOf;
  address manager;

  event eventCharge(address chargeAddr);
  event eventPutForward(address putForwardAddr, uint value);

  constructor(address _manager) public {
    manager = _manager;
  }

  function transfer(address _to, uint _transferValue) external {
    require(balanceOf[msg.sender] > _transferValue);
    require(balanceOf[_to] + _transferValue > balanceOf[_to]);
    balanceOf[msg.sender] -= _transferValue;
    balanceOf[_to] += _transferValue;
  }

  modifier onlyManager() {
    require(msg.sender == manager);
    _;
  }

  function getManager() public view returns(address) {
    return manager;
  }

  function getTotalBalance() onlyManager external view returns(uint){
    return address(this).balance;
  }

  function getBalanceOf(address _addr) public view returns(uint){
    return balanceOf[_addr];
  }

  function charge() external payable {
    balanceOf[msg.sender] += msg.value;
    emit eventCharge(msg.sender);
  }

  function putForward(uint _getValue) external {
    require(balanceOf[msg.sender] >= _getValue);
    balanceOf[msg.sender] -= _getValue;
    msg.sender.transfer(_getValue);
    emit eventPutForward(msg.sender, _getValue);
  }

}
