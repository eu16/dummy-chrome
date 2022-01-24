const getDefaultState = () => {
  return {
      walletype: 'centralized',
      network: "sidechain",
      address: '',
      mainnetWalletAddress: '',
      ownerWalletAddress: '',
      ownerWalletMnemonic: '',
      email: '',
      userId: '',
  }
}

const wallets = {
  state: getDefaultState(),
  mutations: {
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
      walletResetState({ commit }, data) {
          commit('WALLET_RESET_STATE', data)
      },
      walletType({ commit }, data) {
          commit('WALLETTYPE', data)
      },
      userLevel({ commit }, data) {
          commit('USERLEVEL', data)
      },
      network({ commit }, data) {
          commit('NETWORK', data)
      },
      address({ commit }, data) {
          commit('ADDRESS', data)
      },
      setMainnetWalletAddress({ commit }, data) {
          commit('SET_MAINNET_WALLET_ADDRESS', data)
      },
      setOwnerWalletAddress({ commit }, data) {
          commit('SET_OWNER_WALLET_ADDRESS', data)
      },
      setOwnerWalletMnemonic({ commit }, data) {
          commit('SET_OWNER_WALLET_MNEMONIC', data)
      },
      setEmail({ commit }, data) {
          commit('SET_EMAIL', data)
      },
      setUserId({ commit }, data) {
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
}

export default wallets