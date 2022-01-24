const getDefaultState = () => {
    return {
        hideAmount: false,
        // submittedAllDocs: false,
        isLoading: false,

        eurusRpcDomain: '',
        eurusRpcPort: '',
        eurusChainId: '',
        externalSmartContractConfigAddress: '',
        mainnetRpcDomain: '',
        mainnetRpcPort: '',
        mainnetChainId: '',
        eurusInternalConfigAddress: '',
    }
}

const global = {
    state: getDefaultState(),
    mutations: {
        GLOBAL_RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },
        HIDEAMOUNT: (state, data) => {
            state.hideAmount = data;
        },
        // SUBMITTEDALLDOCS: (state, data) => {
        //     state.submittedAllDocs = data;
        // },
        SET_APP_IS_LOADING: (state, data) => {
            state.isLoading = data;
        },
        SET_EURUS_RPC_DOMAIN: (state, data) => {
            state.eurusRpcDomain = data;
        },
        SET_EURUS_RPC_PORT: (state, data) => {
            state.eurusRpcPort = data;
        },
        SET_EURUS_CHAIN_ID: (state, data) => {
            state.eurusChainId = data;
        },
        SET_EXTERNAL_SMART_CONTRACT_CONFIG_ADDRESS: (state, data) => {
            state.externalSmartContractConfigAddress = data;
        },
        SET_MAINNET_RPC_DOMAIN: (state, data) => {
            state.mainnetRpcDomain = data;
        },
        SET_MAINNET_RPC_PORT: (state, data) => {
            state.mainnetRpcPort = data;
        },
        SET_MAINNET_CHAIN_ID: (state, data) => {
            state.mainnetChainId = data;
        },
        SET_EURUS_INTERNAL_CONFIG_ADDRESS: (state, data) => {
            state.eurusInternalConfigAddress = data;
        },
    },
    actions: {
        globalResetState({ commit }, data) {
            commit('GLOBAL_RESET_STATE', data)
        },
        hideAmount({ commit }, data) {
            commit('HIDEAMOUNT', data)
        },
        // submittedAllDocs({ commit }, data) {
        //     commit('SUBMITTEDALLDOCS', data)
        // },
        setAppIsLoading({ commit }, data) {
            commit('SET_APP_IS_LOADING', data)
        },
        setEurusRpcDomain({ commit }, data) {
            commit('SET_EURUS_RPC_DOMAIN', data)
        },
        setEurusRpcPort({ commit }, data) {
            commit('SET_EURUS_RPC_PORT', data)
        },
        setEurusChainId({ commit }, data) {
            commit('SET_EURUS_CHAIN_ID', data)
        },
        setExternalSmartContractConfigAddress({ commit }, data) {
            commit('SET_EXTERNAL_SMART_CONTRACT_CONFIG_ADDRESS', data)
        },
        setMainnetRpcDomain({ commit }, data) {
            commit('SET_MAINNET_RPC_DOMAIN', data)
        },
        setMainnetRpcPort({ commit }, data) {
            commit('SET_MAINNET_RPC_PORT', data)
        },
        setMainnetChainId({ commit }, data) {
            commit('SET_MAINNET_CHAIN_ID', data)
        },
        setEurusInternalConfigAddress({ commit }, data) {
            commit('SET_EURUS_INTERNAL_CONFIG_ADDRESS', data)
        },
    },
    getters: {
        getHideAmount(state) {
            return state.hideAmount
        },
        // getSubmittedAllDocs(state) {
        //     return state.submittedAllDocs
        // },
        getAppIsLoading(state) {
            return state.isLoading
        },
    }
}

export default global