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
        <h3 style="text-align: center; font-size: 0.75rem">
          {{ $t("login.import_wallet") }}
        </h3>
        <br />
        <!-- <span class="form-label"
          >If you already have a Decentralized account, you can import your wallet via a Seed Phrase or Private Ket</span
        > -->
        <!-- <div class="wallet-group">
          <button class="but-ledger" @click="connect">
            <img src="images/ledger.svg" alt="Ledger" />
          </button>
        </div> -->

        <b-tabs
          pills
          content-class="mt-3"
          v-model="currentTabValue"
          align="center"
          style="font-size: 0.75rem"
        >
          <b-tab title="Seed Phrase" active>
            <b-form-textarea
              id="textarea"
              v-model="text"
              placeholder="Enter your seed phrase in correct order and separate each word with spaces"
              rows="3"
              max-rows="6"
              style="text-align: center; font-size: 0.75rem"
            ></b-form-textarea>
          </b-tab>
          <b-tab title="Private Key"
            ><b-form-textarea
              id="textarea"
              v-model="value"
              placeholder="Enter your private Key"
              rows="3"
              max-rows="6"
              style="text-align: center; font-size: 0.75rem"
            ></b-form-textarea
          ></b-tab>
        </b-tabs>
        <br />
        <div class="button-group">
          <button class="outline" @click="$router.push('/home')">
            {{ $t("common.cancel") }}
          </button>
          <button
            class="primary"
            :class="!wallets.accounts.length ? 'flex' : ''"
            @click="connect"
          >
            {{ $t("common.login") }}
          </button>
        </div>
        <div v-if="scene === 2">
          <label class="input-label">
            {{ $t("common.loginpassword") }}
            <input
              class="input-field"
              type="password"
              name="password"
              ref="password"
              v-model="password"
              :placeholder="$t('login.enter_password')"
            />
          </label>
          <label class="input-label">
            {{ $t("common.confirmloginpassword") }}
            <input
              class="input-field"
              type="password"
              name="password_confirm"
              ref="password_confirm"
              v-model="paymPassword_confirm"
              :placeholder="$t('login.enter_password')"
            />
          </label>
        </div>
      </div>
      <!-- <div v-else-if="scene === 2">
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
      /> -->
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import extension from 'extensionizer';
// import detectEthereumProvider from "@metamask/detect-provider";
// import { connectLedgerApp } from "services/LedgerService";
// import { importWallet, getAccount } from "../../../services/utils/web3.js";

export default {
  data() {
    return {
      scene: 1,
      name: "",
      address: "",
      error: {
        show: false,
        message: "",
      },
      value: "",
      text: "",
    };
  },
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
      // console.log("extension 1  - working", extension.storage.local)
      // console.log("extension 2 - working", chrome.storage.local)
      // console.log("extension get", extension.storage.local.get())
      const provider = await detectEthereumProvider();

      if (provider) {
        console.log("Ethereum successfully detected!");

        console.log(provider);
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
      if (this.text != "") {
        console.log("Entered Seed Phrase - check Seed Phrase here");
        this.scene = 2;
      } else if (this.value != "") {
        console.log("Entered Private Key - check Private Key here");
        this.scene = 3;
      }
      // try {
      //   await window.ethereum.request({ method: "eth_requestAccounts" });
      // } catch (error) {
      //   console.error(error);
      // }
    },
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
