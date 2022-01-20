<template>
  <div>
    <app-header headerTab="create-tab" />
    <main class="main">
      <div class="main-logo">
        <img
          src="images/Eurus.svg"
          alt="Eurus"
          style="max-width: 130px; padding: 20px"
        />
      </div>
      <div v-if="scene === 1">
        <label class="input-label">
          {{ $t("common.email") }}
          <input
            class="input-field"
            name="email"
            ref="email"
            v-model="email"
            :placeholder="$t('login.enter_email')"
          />
        </label>
        <label class="input-label">
          {{ $t("common.confirmloginpassword") }}
          <input
            class="input-field"
            type="password"
            name="password"
            ref="password"
            v-model="password"
            :placeholder="$t('login.enter_password')"
          />
        </label>
        <div class="button-group">
          <button
            v-show="wallets.accounts.length > 0"
            class="outline"
            @click="$router.push('/home')"
          >
            {{ $t("common.cancel") }}
          </button>
          <button
            class="primary"
            @click="importKey"
            :class="!wallets.accounts.length ? 'flex' : ''"
            :disabled="!email || !password"
          >
            Import
          </button>
        </div>
      </div>
      <div v-else-if="scene === 2">
        <pincode-modal @success="addAcc" :onBack="() => (scene = 1)" />
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
import _ from "lodash";
import { loginBySignature } from "../../../services/utils/api";
import { isValidEmail } from "../../../services/utils";
import { setEmail, setAddress, getEmail } from "../../../services/utils/auth";

export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    keystorepass: "",
    password_confirm: "",
    privateKey: "",
    keyFromFile: "",
    mnemonic: "",
    scene: 1,
    selectType: "key",
    file: null,
    wallet: null,
  }),
  computed: {
    ...mapState(["wallets"]),
  },

  methods: {
    importKey: async function () {
      if (isValidEmail(this.email)) {
        try {
          let loginBySignatureResult = await loginBySignature(
            this.email.toLowerCase(),
            this.password
          );
          console.log("loginBySignatureResult", loginBySignatureResult);
          if (
            loginBySignatureResult &&
            loginBySignatureResult.returnCode === 0 &&
            loginBySignatureResult.data &&
            loginBySignatureResult.data.walletAddress &&
            loginBySignatureResult.data.token
          ) {
            this.scene = 2;
            setEmail(this.email.toLowerCase());
            setAddress(loginBySignatureResult.data.walletAddress);
            this.wallet = {
              name: this.email,
              address: loginBySignatureResult.data.walletAddress,
              isLedger: false,
            };
            console.log("this.wallet", this.wallet);
          } else {
            this.$notify({
              group: "notify",
              type: "error",
              text: loginBySignatureResult.message,
            });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$notify({
          group: "notify",
          type: "warn",
          text: "Invalid email",
        });
      }
    },
    addAcc() {
      console.log(getEmail());
      this.$store.commit("wallets/addAccount", this.wallet);
      console.log("chrome", chrome);
      alert(
        "Your account is imported successfully. To continue, close this tab and use the extension."
      );
      this.$router.push("/home");
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () {});
      });
    },
  },
};
</script>
<style scoped>
.type-row {
  display: flex;
  justify-content: space-between;
}
.row-label {
  width: 35%;
  margin: auto;
  color: black;
  justify-content: center;
}
.type-select {
  width: 65%;
}
.file-field {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 300px;
}
.file-row {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}
input[type="file"] {
  border: 1px solid #0a93eb;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.big-label {
  font-size: 1rem;
  color: black;
}
</style>
