const { ChainID, ChainType } = require("@harmony-js/utils");

export function getEurusApiUrl() {
  return process.env.VUE_APP_EURUS_RPC_URL;
}

export default {
  networks: [
    {
      id: 1,
      chainId: ChainID.HmyMainnet,
      name: "Mainnet",
      apiUrl: "https://api.s0.t.hmny.io",
      type: ChainType.Harmony,
    },
    {
      id: 2,
      chainId: ChainID.HmyTestnet,
      name: "Testnet",
      apiUrl: "https://api.s0.b.hmny.io",
      type: ChainType.Harmony,
    },
    {
      id: 3,
      chainId: ChainID.HmyLocal,
      name: "Localnet",
      apiUrl: "http://127.0.0.1:9500",
      type: ChainType.Harmony,
    },
  ],
};
