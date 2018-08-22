<template>
  <div>
    <h2>Welcome to your wallet</h2>
    <h5>your account: {{this.accounts[0]}}</h5>

    输入转账地址：<input type="text" v-model="address"><br/>
    输入转账金额：<input type="text" v-model="transactionEth"><br/>
    <button @click="handleTransaction">转账</button>
    <button @click="handleLogout">退出登录</button>

    <h2>我的token</h2>
    <input type="text" v-model="tokenAddress"><button @click="importToken">导入token</button>

    <ul>
      <li v-for="coin in coinList">
        <div>
          <span>tokenName: </span>
          <span>{{coin.tokenName}}</span>
        </div>
        <div>
          <span>tokenSymbol: </span>
          <span>{{coin.tokenSymbol}}</span>
        </div>
        <div>
          <span>tokenAmount: </span>
          <span>{{coin.tokenAmount}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import HDWalletProvider from "truffle-hdwallet-provider";
  import {network} from '../../config/config';
  import {tokenAbi} from '../../token/tokenAbi';

  let web3;

  export default {
    name: "HomePage",
    data() {
      return {
        address: "",
        transactionEth: "",
        tokenAddress: "",
        accounts: [],
        ethUnit: 1000000000000000000,
        tokenContract: null,
        coinList: []
      }
    },
    async mounted() {
      const token = JSON.parse(localStorage.getItem("token"));
      if(token === null) {
        this.$router.push('/');
        return;
      }

      web3 = new Web3(new HDWalletProvider(token.mnemonic, network));
      this.accounts = await web3.eth.getAccounts();
    },
    methods: {
      //进行转账交易
      async handleTransaction() {

        console.log(await web3.eth.getBalance(this.accounts[0]));
        const balance = await web3.eth.getBalance(this.accounts[0])
        if(balance < this.transactionEth) {
          throw Error('余额不足');
          return;
        }
        await web3.eth.sendTransaction({
          from: this.accounts[0],
          to: this.address,
          value: this.transactionEth * this.ethUnit
        })
      },

      //登出
      handleLogout() {
        localStorage.removeItem("token");
        this.$router.push('/');
      },

      //导入token代币
      async importToken() {
        const tokenContract = await new web3.eth.Contract(tokenAbi,this.tokenAddress);
        this.tokenContract = tokenContract;
        const tokenName = await tokenContract.methods.name().call({from: this.accounts[0]});
        const tokenSymbol = await tokenContract.methods.symbol().call({from: this.accounts[0]});
        const tokenAmount = await tokenContract.methods.balanceOf(this.accounts[0]).call({from: this.accounts[0]});
        this.coinList.push({
          tokenName,
          tokenSymbol,
          tokenAmount
        })
      }

    }

  }
</script>

<style scoped>

</style>
