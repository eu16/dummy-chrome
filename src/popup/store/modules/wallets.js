import _ from "lodash";
export default {
  namespaced: true,

  state: {
    active: {
      name: "",
      isLedger: false,
      address: false,
      keystore: false,
      walletype: 'centralized',
      network: "sidechain",
      address: '',
      mainnetWalletAddress: '',
      ownerWalletAddress: '',
      ownerWalletMnemonic: '',
      email: '',
      userId: '',
    },
    accounts: [],
  },

  mutations: {
    addAccount(state, payload) {
      //payload should look like {name: "Account1", address: "one1xxxx", keystore: Object, isLedger: xxx};
      if (payload.isLedger) {
        //check for existing ledger account
        const acc = _.find(state.accounts, {
          isLedger: true
        });
        //replace the existing account
        if (acc !== undefined) {
          acc.name = payload.name;
          acc.address = payload.address;
          state.active = acc;
          return;
        }
      }
      //else if there's no ledger or not a ledger account, then insert a new account
      state.accounts.push(payload);
      state.active = payload;
    },
    setActive(state, payload) {
      //set active account when you select the account in the menu
      const acc = _.find(state.accounts, {
        address: payload
      });
      state.active = acc;
    },
    WALLET_RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
    WALLETTYPE: (state, data) => {
      // localStorage.setItem('walletype', data);
      state.walletype = data;
    },
    USERLEVEL: (state, data) => {
      state.userlevel = data;
    },
    NETWORK: (state, data) => {
      state.network = data
    },
    ADDRESS: (state, data) => {
      state.address = data
    },
    SET_MAINNET_WALLET_ADDRESS: (state, data) => {
      state.mainnetWalletAddress = data
    },
    SET_OWNER_WALLET_ADDRESS: (state, data) => {
      state.ownerWalletAddress = data
    },
    SET_OWNER_WALLET_MNEMONIC: (state, data) => {
      state.ownerWalletMnemonic = data
    },
    SET_EMAIL: (state, data) => {
      state.email = data
    },
    SET_USERID: (state, data) => {
      state.userId = data
    },
  },
  actions: {
    walletResetState({
      commit
    }, data) {
      commit('WALLET_RESET_STATE', data)
    },
    walletType({
      commit
    }, data) {
      commit('WALLETTYPE', data)
    },
    userLevel({
      commit
    }, data) {
      commit('USERLEVEL', data)
    },
    network({
      commit
    }, data) {
      commit('NETWORK', data)
    },
    address({
      commit
    }, data) {
      commit('ADDRESS', data)
    },
    setMainnetWalletAddress({
      commit
    }, data) {
      commit('SET_MAINNET_WALLET_ADDRESS', data)
    },
    setOwnerWalletAddress({
      commit
    }, data) {
      commit('SET_OWNER_WALLET_ADDRESS', data)
    },
    setOwnerWalletMnemonic({
      commit
    }, data) {
      commit('SET_OWNER_WALLET_MNEMONIC', data)
    },
    setEmail({
      commit
    }, data) {
      commit('SET_EMAIL', data)
    },
    setUserId({
      commit
    }, data) {
      commit('SET_USERID', data)
    }
  },
  getters: {
    getNetwork(state) {
      return state.network
    },
    getAddress(state) {
      return state.address
    },
    getWalletType(state) {
      return state.walletype
    },
    getUserlevel(state) {
      return state.userlevel
    },
    getUserId(state) {
      return state.userId
    },
  }
};