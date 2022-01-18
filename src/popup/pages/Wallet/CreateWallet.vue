<template>
  <div>
    <app-header headerTab="create-tab" />
    <main class="main">
      <div class="main-logo" v-if="scene === 1 || scene === 4">
        <img src="images/Eurus.svg" alt="Eurus" style="max-width:130px; padding:20px" />
      </div>
      <div v-if="scene === 1">
        <!-- <label class="input-label account-name">
          Account Name
          <input
            class="input-field"
            type="text"
            name="name"
            ref="name"
            v-model="name"
            placeholder="Input the account name"
            v-on:keyup.enter="createName"
          />
        </label> -->
        <label class="input-label">
          {{ $t("common.email") }}
          <input
            class="input-field"
            type="email"
            name="email"
            ref="email"
            v-model="email"
            :placeholder="$t('login.enter_email')"
            v-on:keyup.enter="createName"
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
        <label class="input-label">
          {{ $t("common.loginpassword") }}
          <input
            class="input-field"
            type="password"
            name="password_confirm"
            ref="password_confirm"
            v-model="password_confirm"
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
            @click="createName"
            class="primary"
            :class="!wallets.accounts.length ? 'flex' : ''"
            :disabled="!email || !password || !password_confirm "
          >
            {{ $t("common.create") }}
          </button>
        </div>
      </div>
      <div v-else-if="scene === 2">
              
        <!-- <label class="input-label">
          Email
          <input
            class="input-field"
            type="email"
            name="email"
            ref="email"
            v-model="email"
            placeholder="Enter your email"
          />
        </label> -->
        <label class="input-label">
          {{ $t("passwordType.payment_pw") }}
          <input
            class="input-field"
            type="password"
            name="password"
            ref="password"
            v-model="password"
            :placeholder="$t('register.enter_pp')"
          />
        </label>
        <label class="input-label">
          {{ $t("common.confirmPaymentpassword") }}
          <input
            class="input-field"
            type="password"
            name="password_confirm"
            ref="password_confirm"
            v-model="password_confirm"
            :placeholder="$t('passwordType.confirm_new_payment_pw')"
          />
        </label>
        <!-- <label class="input-label">
          Seed Phrase
          <a class="copy-tag" @click.prevent="copyToClipboard"
            >(Click here to copy)</a
          >
          <textarea
            class="input-field"
            name="seed_phrase"
            ref="seed_phrase"
            v-model="seed_phrase"
            placeholder="Seed Phrase"
          />
        </label> -->
        <input type="checkbox" id="seedcheck" :value="agree" v-model="agree" />
        <label class="check-label" for="seedcheck"
          >{{ $t("termsAndConditions.creation") }}  <a
            target="_blank"
            href="https://www.eurus.network/support/terms-of-use/"
            ><span>{{ $t("termsAndConditions.agreementTerms") }}.</span></a
          ></label
        >
        <!-- <label class="check-label" for="seedcheck"
          >I understand that lost seeds cannot be recovered.</label
        > -->
        <div class="button-group">
          <button class="outline" @click="() => (scene = 1)">Back</button>
          <button class="primary" @click="confirmPassword" :disabled="!agree">
            Next
          </button>
        </div>
      </div>
      <div v-else-if="scene === 3">
        <seed-checker :phrase="seed_phrase" :confirm="() => (scene = 4)" />
      </div>
      <div v-else>
        <pincode-modal @success="addAccount" :onBack="() => (scene = 3)" />
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
import account from "mixins/account";
import {
  generatePhrase,
  createAccountFromMnemonic,
} from "services/AccountService";
import { mapState } from "vuex";
// import { setEmail } from "../../../services/utils/auth"
// import { registerByEmail, setupPaymentWallet } from "../../../services/utils/api"

export default {
  mixins: [account],
  data: () => ({
    name: "",
    password: "",
    agree: false,
    password_confirm: "",
    seed_phrase: "",
    scene: 1,
    wallet: null,
  }),
  computed: {
    ...mapState(["wallets"]),
  },
  methods: {
    addAccount() {
      this.$store.commit("wallets/addAccount", {
        ...this.wallet,
        isLedger: false,
      });
      alert(
        "Your account is created successfully. To continue, close this tab and use the extension."
      );
      chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() {});
      });
    },
    async confirmPassword() {
      if (this.password.length < 8) {
        this.$notify({
          group: "notify",
          type: "warn",
          text: "Password must be longer than 8 characters",
        });
        return;
      } else if (this.password !== this.password_confirm) {
        this.$notify({
          group: "notify",
          type: "error",
          text: "Password doesn't match",
        });
        return;
      }
      this.wallet = await createAccountFromMnemonic(
        this.name,
        this.seed_phrase,
        this.password
      );
      if (!this.wallet) {
        this.$notify({
          group: "notify",
          type: "error",
          text: "Password is incorrect or mnemonic is incorrect",
        });
        return;
      }
      this.scene = 3;
    },
    copyToClipboard() {
      this.$copyText(this.seed_phrase).then(() => {
        this.$notify({
          group: "notify",
          type: "info",
          text: "Copied to Clipboard",
        });
      });
    },
    createName() {
      // if (this.name === "") {
      //   this.$notify({
      //     group: "notify",
      //     text: "Invalid name",
      //   });
      //   return;
      // }
      this.seed_phrase = generatePhrase();
      this.scene = 2;
    },
    // createName: async function () {
    //   this.$store.dispatch("setAppIsLoading", true);
    //   try {
    //     let registerByEmailResult = await registerByEmail(
    //       this.email.toLowerCase(),
    //       this.password
    //     );
    //     if (
    //       registerByEmailResult &&
    //       registerByEmailResult.returnCode === 0 &&
    //       registerByEmailResult.data &&
    //       registerByEmailResult.data.userId
    //     ) {
    //       if (registerByEmailResult.data.code) {
    //         alert(registerByEmailResult.data.code);
    //       }
    //       setEmail(this.form.email.toLowerCase());
    //       this.$router.push({
    //         name: "verify",
    //         params: {
    //           inputEmail: this.form.email.toLowerCase(),
    //           inputPaymentPassword: this.form.pppassword,
    //           inputUserId: registerByEmailResult.data.userId,
    //           verificationType: constants.verificationType.REGISTER,
    //         },
    //       });
    //     } else if (
    //       registerByEmailResult &&
    //       registerByEmailResult.returnCode === -20
    //     ) {
    //       this.$message("Email Already Register", "warning");
    //     } else if (
    //       registerByEmailResult &&
    //       registerByEmailResult.isServerMaintenance
    //     ) {
    //       this.$message(this.$i18n.t("common.server_maintenance"), "warning");
    //     } else {
    //       this.$message("Error", "warning");
    //     }
    //     this.$store.dispatch("setAppIsLoading", false);
    //   } catch (err) {
    //     console.error(err);
    //     this.$store.dispatch("setAppIsLoading", false);
    //     this.$message(this.$i18n.t("common.network_error"), "warning");
    //   } finally {
    //     this.$store.dispatch("setAppIsLoading", false);
    //   }
    // },
    // setupPaymentWallet: async function (verificationResult, rsaPrivateKey) {
    //   let token = verificationResult.data.token;
    //   let email = verificationResult.data.email;
    //   let paymentPassword = this.paymentPassword;
    //   let userId = verificationResult.data.userId;
    //   let encryptedMnemonicString = verificationResult.data.mnemonic;
    //   let setupPaymentWalletResult = await setupPaymentWallet(
    //     token,
    //     email,
    //     paymentPassword,
    //     userId,
    //     encryptedMnemonicString,
    //     rsaPrivateKey
    //   );
    //   if (
    //     setupPaymentWalletResult &&
    //     setupPaymentWalletResult.returnCode === 0 &&
    //     setupPaymentWalletResult.data.token &&
    //     setupPaymentWalletResult.data.walletAddress &&
    //     setupPaymentWalletResult.data.mainnetWalletAddress
    //   ) {
    //     setToken(setupPaymentWalletResult.data.token);
    //     setAddress(setupPaymentWalletResult.data.walletAddress);
    //     setEmail(email);
    //     setAccounttype("centralized");
    //     setMainnetWalletAddress(
    //       setupPaymentWalletResult.data.mainnetWalletAddress
    //     );

    //     setOwnerWalletAddress(
    //       setupPaymentWalletResult.paymentWallet.walletAddress
    //     );
    //     setOwnerWalletMnemonic(encryptedMnemonicString);

    //     this.$store.dispatch("setAppIsLoading", false);
    //     this.$router.push("/dashboard");
    //     try {
    //       firebase.analytics().logEvent("login", { method: "decentralized" });
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   } else {
    //     if (
    //       setupPaymentWalletResult &&
    //       setupPaymentWalletResult.returnCode === -5
    //     ) {
    //       this.$message("Server Busy", "warning");
    //     } else {
    //       this.$message("Error", "warning");
    //     }
    //     this.$router.back();
    //   }
    // },
  },
};
</script>

<style scoped>
.button-group {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.error {
  color: red;
  font-size: 10px;
  margin-top: 5px;
}
.account-name {
  font-size: 1rem;
  color: black;
  margin-bottom: 30px !important;
}
.account-name > input {
  margin-top: 15px !important;
}
.copy-tag {
  color: blue;
}
.check-label {
  font-size: 0.75rem;
  margin: 0.75rem 0 1rem;
  color: #757575;
  cursor: pointer;
}
</style>
