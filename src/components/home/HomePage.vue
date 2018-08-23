<template>
  <div>
    <h2>Welcome to your wallet</h2>
    <h5>your account: {{this.accounts[0]}}</h5>

    <button @click="createChildAccount">创建子账户</button>
    <button @click="setChildAccount">设置子账户</button>
    <select name="accountIndex" id="accountIndex" v-model="accountIndex">
      <option value="0">0</option>
    </select><br/>

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
  import {mapActions, mapGetters} from 'vuex'
  import {network} from '../../config/config';
  import {tokenAbi} from '../../token/tokenAbi';

  export default {
    name: "HomePage",
    data() {
      return {
        //转账地址
        address: "",
        //转账金额
        transactionEth: "",
        //代币地址
        tokenAddress: "",
        //当前账户
        accounts: [],

        accountIndex: 0,
        //ether单位
        ethUnit: 1000000000000000000,
        //代币合约地址
        tokenContract: null,
        coinList: []
      }
    },

    computed: {
      ...mapGetters(['web3'])
    },

    async mounted() {
      const token = JSON.parse(localStorage.getItem("token"));
      if(token === null) {
        this.$router.push('/');
        return;
      }
      this.initWeb3(new Web3(new HDWalletProvider(token.mnemonic, network, this.accountIndex)));
      this.accounts = await this.web3.eth.getAccounts();
      console.log(this.accounts);
    },
    methods: {
      ...mapActions(["initWeb3", "setWeb3Provider"]),

      //进行转账交易
      async handleTransaction() {
        // console.log(this.address);
        // console.log(this.transactionEth);
        console.log(await this.web3.eth.getBalance(this.accounts[0]));
        const balance = await this.web3.eth.getBalance(this.accounts[0])
        if(balance < this.transactionEth) {
          throw Error('余额不足');
          return;
        }
        await this.web3.eth.sendTransaction({
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

      //创建子账户
      async createChildAccount() {

      },

      //设置子账户
      async setChildAccount () {
        const token = JSON.parse(localStorage.getItem("token"));
        this.setWeb3Provider(new HDWalletProvider(token.mnemonic, network, this.accountIndex));
        this.accountIndex += 1;
        this.accounts = await this.web3.eth.getAccounts();
      },

      //导入代币
      async importToken() {
        const tokenContract = await new this.web3.eth.Contract(tokenAbi,this.tokenAddress);
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
