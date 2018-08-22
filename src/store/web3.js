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
  setWeb3:(context,web3)=>{
    context.commit('setWeb3',web3);
  },
  logout:(context)=>{
    localStorage.removeItem(key);
    context.commit('setWeb3',null);
  }
};

const mutations = {
  setWeb3: (state, web3) => {
    state.web3 = web3;
  }
};

export default {
  state, getters, actions, mutations
}
