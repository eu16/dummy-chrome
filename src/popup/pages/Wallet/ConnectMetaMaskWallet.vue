<template>
  <div>
    <app-header headerTab="create-tab" />
    <main class="main connect-wallet">
      <div class="main-logo">
        <!-- <img
          src="images/harmony.png"
          :class="{ 'logo-md': scene === 2 ? true : false }"
          alt="Harmony"
        /> -->
        <img
          src="images/Eurus.svg"
          alt="Eurus"
          style="max-width: 130px; padding: 20px"
        />
      </div>
      <div v-if="scene === 1">
        <h3 style="text-align: center; font-size: 1.5rem">
          {{ $t("login.login_with_metamask") }}
        </h3>
        <span class="form-label"
          >If you already have an account with Metamask you can connect your
          wallet directly via Metamask</span
        >
        <!-- <div class="wallet-group">
          <button class="but-ledger" @click="connect">
            <img src="images/ledger.svg" alt="Ledger" />
          </button>
        </div> -->
        <div class="button-group">
          <button class="outline" @click="$router.push('/home')">
            {{ $t("common.cancel") }}
          </button>
          <button
            class="primary"
            :class="!wallets.accounts.length ? 'flex' : ''"
            @click="connect"
          >
            Connect
          </button>
        </div>
      </div>
      <div v-else-if="scene === 2">
        <h3>Create the Account</h3>
        <div>Address</div>
        <span class="address-label">{{ address }}</span>
        <label class="input-label align-left">
          Account Name
          <input
            class="input-field"
            type="text"
            name="name"
            ref="name"
            v-model="name"
            placeholder="Input the account name"
            v-on:keyup.enter="nextToPincode"
          />
        </label>
        <button
          class="primary flex mt-20"
          :disabled="!name"
          @click="nextToPincode"
        >
          Next
        </button>
      </div>
      <div v-else>
        <pincode-modal @success="createAccount" :onBack="() => (scene = 2)" />
      </div>
      <notifications
        group="notify"
        width="250"
        :max="2"
        class="notifiaction-container"
      />
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import detectEthereumProvider from "@metamask/detect-provider";
// import { connectLedgerApp } from "services/LedgerService";
// import { importWallet, getAccount } from "../../../services/utils/web3.js";

export default {
  data: () => ({
    scene: 1,
    name: "",
    address: "",
    error: {
      show: false,
      message: "",
    },
  }),
  computed: {
    ...mapState(["wallets"]),
  },
  mounted() {
    this.connectMetamask();
  },
  methods: {
    nextToPincode() {
      this.scene = 3;
    },
    connectMetamask: async function () {
      const provider = await detectEthereumProvider();

      if (provider) {
        console.log("Ethereum successfully detected!");

        console.log(provider)
        // const chainId = await provider.request({
        //   method: "eth_chainId",
        // });
      } else {
        console.error("Please install MetaMask!", error);
      }
    },
    createAccount() {
      const wallet = {
        isLedger: true,
        name: this.name,
        address: this.address,
        keystore: "",
      };

      this.$store.commit("wallets/addAccount", wallet);
      alert(
        "Your ledger account is loaded. To continue, close this tab and use the extension."
      );
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () {});
      });
    },
    connect: async function () {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error(error);
      }
    },
    // connect: async function () {
    //   let accounts = await getAccount();
    //   let accountAddress = accounts[0];
    //   setAddress(accountAddress);
    //   try {
    //     let importWalletResponse = await importWallet(accountAddress);
    //     if (
    //       importWalletResponse &&
    //       importWalletResponse.data &&
    //       importWalletResponse.data.data &&
    //       importWalletResponse.data.data.token
    //     ) {
    //       setToken(importWalletResponse.data.data.token);
    //       setAccounttype("decentralized");
    //       this.$store.dispatch("setAppIsLoading", false);
    //       this.$router.push("/home");
    //     } else if (
    //       importWalletResponse &&
    //       importWalletResponse.status === 404
    //     ) {
    //       // this.$message(
    //       //   this.$i18n.t("common.server_maintenance"),
    //       //   "warning"
    //       // );
    //       console.log(this.$i18n.t("common.server_maintenance"));
    //     } else {
    //       // this.$message(
    //       //   this.$i18n.t("common.network_error"),
    //       //   "warning"
    //       // );
    //       console.log(this.$i18n.t("common.network_error"));
    //     }
    //   } catch (error) {
    //     console.error("importWallet error:", error);
    //     if (error && error.response && error.response.status === 404) {
    //       // this.$message(
    //       //   this.$i18n.t("common.server_maintenance"),
    //       //   "warning"
    //       // );
    //       console.log(this.$i18n.t("common.server_maintenance"));
    //     }
    //   }
    // },
  },
};
</script>
<style scoped>
.connect-wallet {
  text-align: center;
}
.align-left {
  text-align: left;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
.form-label {
  font-size: 0.8rem;
}
.address-label {
  font-size: 0.65rem;
  font-style: italic;
}
.but-ledger {
  background: white;
  padding: 2rem;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.but-ledger:hover,
.but-ledger:focus {
  border-color: #0987d7;
  cursor: pointer;
}
.but-ledger:active {
  background: #f0f0f0;
}
.wallet-group {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>
