const key = "token";

const state = {
  web3:null
};

const getters = {
  web3:(state)=>state.web3
};

const actions = {
  loadLocalMnemonic:(context)=>{
    let token = localStorage.getItem(key);
    context.commit('setWeb3',);
  },
  initWeb3: (context, web3) => {
    context.commit('initWeb3', web3)
  },
  setWeb3Provider:(context,provider)=>{
    context.commit('setWeb3Provider',provider);
  },

};

const mutations = {
  setWeb3Provider: (state, provider) => {
    state.web3.setProvider(provider);
  },
  initWeb3: (state, web3) => {
    state.web3 = web3;
  }
};

export default {
  state, getters, actions, mutations
}
