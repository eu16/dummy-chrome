export default {
    state: {
        mainnet: {},
        sidechain: {},
        centralized: [],
        tokenAddressList: {},
        favouriteAddressList: [],
        eurusUserDepositAddress: '',
        platformWalletAddress: '',
        faucetList: [],
        assetAllocationAlertMsgNotShowAgain: false,
        gasTooLowAlertMsgNotShowAgain: false,
    },

    mutations: {
        ASSETS_RESET_STATE(state) {
            Object.assign(state)
        },
        MAINNET: (state, data) => {
            state.mainnet = data;
        },
        SIDECHAIN: (state, data) => {
            state.sidechain = data;
        },
        CENTRALIZED: (state, data) => {
            state.centralized = data;
        },
        SET_TOKEN_ADDRESS_LIST: (state, data) => {
            state.tokenAddressList = data;
        },
        SET_FAVOURITE_ADDRESS_LIST: (state, data) => {
            state.favouriteAddressList = data;
        },
        SET_EURUS_USER_DEPOSIT_ADDRESS: (state, data) => {
            state.eurusUserDepositAddress = data;
        },
        SET_PLATFORM_WALLET_ADDRESS: (state, data) => {
            state.platformWalletAddress = data;
        },
        SET_FAUCET_LIST: (state, data) => {
            state.faucetList = data;
        },
        SET_ASSET_ALLOCATION_ALERT_MSG_NOT_SHOW_AGAIN: (state, data) => {
            state.assetAllocationAlertMsgNotShowAgain = data;
        },
        SET_GAS_TOO_LOW_ALERT_MSG_NOT_SHOW_AGAIN: (state, data) => {
            state.gasTooLowAlertMsgNotShowAgain = data;
        },
    },
    actions: {
        assetsResetState({ commit }, data) {
            commit('ASSETS_RESET_STATE', data)
        },
        mainNet({ commit }, data) {
            commit('MAINNET', data)
        },
        sideChain({ commit }, data) {
            commit('SIDECHAIN', data)
        },
        Centralized({ commit }, data) {
            commit('CENTRALIZED', data)
        },
        setTokenAddressList({ commit }, data) {
            commit('SET_TOKEN_ADDRESS_LIST', data)
        },
        setFavouriteAddressList({ commit }, data) {
            commit('SET_FAVOURITE_ADDRESS_LIST', data)
        },
        setEurusUserDepositAddress({ commit }, data) {
            commit('SET_EURUS_USER_DEPOSIT_ADDRESS', data)
        },
        setPlatformWalletAddress({ commit }, data) {
            commit('SET_PLATFORM_WALLET_ADDRESS', data)
        },
        setFaucetList({ commit }, data) {
            commit('SET_FAUCET_LIST', data)
        },
        setAssetAllocationAlertMsgNotShowAgain({ commit }, data) {
            commit('SET_ASSET_ALLOCATION_ALERT_MSG_NOT_SHOW_AGAIN', data)
        },
        setGasTooLowAlertMsgNotShowAgain({ commit }, data) {
            commit('SET_GAS_TOO_LOW_ALERT_MSG_NOT_SHOW_AGAIN', data)
        },
    },
    getters: {
        getMainnet(state) {
            return state.mainnet
        },
        getSidechain(state) {
            return state.sidechain
        },
        getTokenAddressList(state) {
            return state.tokenAddressList
        },
        getFavouriteAddressList(state) {
            return state.favouriteAddressList
        },
        getEurusUserDepositAddress(state) {
            return state.eurusUserDepositAddress
        },
        getPlatformWalletAddress(state) {
            return state.platformWalletAddress
        },
        getFaucetList(state) {
            return state.faucetList
        },
        getAssetAllocationAlertMsgNotShowAgain(state) {
            return state.assetAllocationAlertMsgNotShowAgain
        },
        getGasTooLowAlertMsgNotShowAgain(state) {
            return state.gasTooLowAlertMsgNotShowAgain
        },
    },
}