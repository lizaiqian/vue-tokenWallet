<template>
  <!--调试页面-->
  <div>
    <button @click="handleCreateAccount">创建账户</button> <br/>
    <button @click="handleToggleMnemonic" >显示助记词</button><span v-show="isShow">{{this.generateMnemonic}}</span>
    <br/>
    输入助记词：<input type="text" v-model="mnemonic"><br/>
    输入密码：<input type="password" v-model="importPassword"><br/>
    <button @click="handleImportAccount">导入用户</button>
    <br/>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import bip39 from 'bip39';
  import hash from 'hash.js'
  import HDWalletProvider from "truffle-hdwallet-provider";
  import {network} from '../config/config'
  import {mapGetters, mapActions} from 'vuex'

  let web3 = new Web3();

  export default {
    name: "LoginPage",
    data() {
      return {
        importPassword: "",
        generateMnemonic: "",
        isShow: false,
        mnemonic: "",
        token: null,
        accounts: [],
      }
    },
    mounted () {
      const token = localStorage.token;
      if(token === undefined) {
        return;
      }
      this.token = JSON.parse(token);
      // console.log(this.token.mnemonic);
    },
    methods: {
      ...mapActions(['setWeb3']),
      //创建账户
      async handleCreateAccount() {
        this.generateMnemonic = bip39.generateMnemonic();
      },

      handleToggleMnemonic() {
        this.isShow = !this.isShow;
      },

      //导入助记词
      async handleImportAccount() {
        const mnemonic = this.mnemonic; // 12 word mnemonic
        const provider = new HDWalletProvider(mnemonic, network);
        web3.setProvider(provider);
        this.accounts = await web3.eth.getAccounts();
        const passwordHash = hash.sha256().update(this.importPassword).digest("hex");

        localStorage.setItem("token", JSON.stringify({mnemonic, password: passwordHash}));

        this.$router.push('/home');
      },

    }

  }
</script>

<style scoped>

</style>
