const getDefaultState = () => {
    return {
      mainnet: {},
      sidechain: {},
      txnDetails: {
        mainnet: {},
        sidechain: {},
      },
      pendingConfirmationTxn: {},
    }
  }
  
  const transactions = {
    state: getDefaultState(),
    mutations: {
      TXN_RESET_STATE(state) {
        Object.assign(state, getDefaultState())
      },
      TXN_MAINNET: (state, data) => {
        state.mainnet = data;
      },
      TXN_SIDECHAIN: (state, data) => {
        state.sidechain = data;
      },
      TXN_DETAILS: (state, data) => {
        state.txnDetails = data;
      },
      SET_PENDING_CONFIRMATION_TXN: (state, data) => {
        state.pendingConfirmationTxn = data;
      },
    },
    actions: {
      txnResetState({ commit }, data) {
        commit('TXN_RESET_STATE', data)
      },
      txnMainNet({ commit }, data) {
        commit('TXN_MAINNET', data)
      },
      txnSideChain({ commit }, data) {
        commit('TXN_SIDECHAIN', data)
      },
      txnDetails({ commit }, data) {
        commit('TXN_DETAILS', data)
      },
      setPendingConfirmationTxn({ commit }, data) {
        commit('SET_PENDING_CONFIRMATION_TXN', data)
      },
    },
    getters: {
      getTxnMainnet(state) {
        return state.mainnet
      },
      getTxnSidechain(state) {
        return state.sidechain
      },
      getTxnDetails(state) {
        return state.txnDetails
      },
      getPendingConfirmationTxn(state) {
        return state.pendingConfirmationTxn
      },
    }
  }
  
  export default transactions