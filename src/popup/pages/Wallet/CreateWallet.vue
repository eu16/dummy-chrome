<template>
  <div>
    <app-header headerTab="create-tab" />
    <main class="main">
      <!-- <div class="main-logo" v-if="scene === 1 || scene === 4"> -->
      <div class="main-logo" v-if="scene === 1 || scene === 2 || scene === 3">
        <img
          src="images/Eurus.svg"
          alt="Eurus"
          style="max-width: 130px; padding: 20px"
        />
      </div>
      <!-- <h3 style="text-align:center; font-size:0.8rem">{{ $t("register.create_an_account") }}</h3> -->
      <div v-if="scene === 1">
        <label class="input-label">
          {{ $t("common.email") }}
          <input
            class="input-field"
            type="text"
            name="name"
            ref="name"
            v-model="name"
            :placeholder="$t('login.enter_email')"
          />
        </label>
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
            :disabled="!name || !password || !password_confirm"
          >
            {{ $t("common.create") }}
          </button>
        </div>
      </div>
      <div v-else-if="scene === 2">
        <label class="input-label">
          {{ $t("passwordType.payment_pw") }}
          <input
            class="input-field"
            type="password"
            name="password"
            ref="password"
            v-model="paymPassword"
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
            v-model="paymPassword_confirm"
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
          >{{ $t("termsAndConditions.creation") }}
          <a
            target="_blank"
            href="https://www.eurus.network/support/terms-of-use/"
            ><span>{{ $t("termsAndConditions.agreementTerms") }}.</span></a
          ></label
        >
        <!-- <label class="check-label" for="seedcheck"
          >I understand that lost seeds cannot be recovered.</label
        > -->
        <div class="button-group">
          <button class="outline" @click="() => (scene = 1)">
            {{ $t("common.back") }}
          </button>
          <button
            class="primary"
            @click="confirmPassword"
            :disabled="!agree || !paymPassword || !paymPassword_confirm"
          >
            {{ $t("common.next") }}
          </button>
        </div>
      </div>
      <div style="text-align: center" v-else-if="scene === 3">
        <div class="pin-label">{{ $t("sentences.verification_code") }}</div>
        <p style="font-size: 0.7rem">
          {{ $t("sentences.verificationSentTo") }} {{ name }}
        </p>
        <div class="pin-container">
          <!-- <div
          class="pin-container"
          :class="{ 'pin-fail': pinfail }"
          :style="{
            'margin-left': getPinMargin(getPinCode.digits),
            'margin-right': getPinMargin(getPinCode.digits),
          }"
        > -->
          <PincodeInput
            :length="digit"
            :characterPreview="false"
            ref="smscode"
            v-model="smscode"
          />
        </div>
      </div>
      <div v-else-if="scene === 4">
        <seed-checker :phrase="seed_phrase" :confirm="() => (scene = 5)" />
      </div>
      <div v-else>
        <pincode-modal @success="addAccount" :onBack="() => (scene = 4)" />
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
import {
  isValidEmail,
  isAlphaNum,
  checkTextLength,
} from "../../../services/utils";
import {
  setLocale,
  getLocale,
  setEmail,
  getEurusPublicKey,
  getEurusPrivateKey,
} from "../../../services/utils/auth";
import {
  verification,
  registerByEmail,
  setupPaymentWallet,
} from "../../../services/utils/api";

export default {
  mixins: [account],
  data() {
    return {
      digit: 6,
      sms: [],
      name: "",
      userId: "",
      smscode: "",
      password: "",
      paymPassword: "",
      password_confirm: "",
      paymPassword_confirm: "",
      seed_phrase: "",
      agree: false,
      scene: 1,
      wallet: null,
    };
  },
  computed: {
    ...mapState(["wallets"]),
  },
  mounted() {
    // this.testWeb3();
  },
  watch: {
    smscode() {
      if (this.smscode.length === this.digit) {
        this.verifySmsCode();
      }
    }
  },
  // created: function () {
  //   if (!getLocale()) {
  //     if (this.$i18n.locale) {
  //       setLocale(this.$i18n.locale);
  //     } else {
  //       setLocale("en");
  //     }
  //   }
  // },
  methods: {
    // testWeb3: async function () {
    //   const web3 = new Web3(window.ethereum)
    // },
    addAccount() {
      this.$store.commit("wallets/addAccount", {
        ...this.wallet,
        isLedger: false,
      });
      alert(
        "Your account is created successfully. To continue, close this tab and use the extension."
      );
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () {});
      });
    },
    createName() {
      if (isValidEmail(this.name)) {
        if (
          isAlphaNum(this.password) &&
          checkTextLength(this.password, 8, 20)
        ) {
          if (this.password === this.password_confirm) {
            console.log("password is good to go");
            this.seed_phrase = generatePhrase();
            console.log("this.scene is 2");
            this.scene = 2;
          } else {
            this.$notify({
              group: "notify",
              type: "error",
              text: "Passwords are not matching",
            });
          }
        } else {
          this.$notify({
            group: "notify",
            type: "error",
            text: "Please make sure your password is between 8 to 20 characters and contains at least 1 alphabetical and 1 numerical charater",
          });
        }
      } else {
        this.$notify({
          group: "notify",
          type: "warn",
          text: "Invalid email",
        });
      }
    },
    async confirmPassword() {
      if (
        isAlphaNum(this.paymPassword) ||
        checkTextLength(this.paymPassword, 8, 20)
      ) {
        if (this.paymPassword != this.password) {
          if (this.paymPassword === this.paymPassword_confirm) {
            console.log("payment password is good to go");
            this.registerAccountByEmail();
          } else {
            this.$notify({
              group: "notify",
              type: "error",
              text: "Passwords are not matching",
            });
          }
        } else {
          this.$notify({
            group: "notify",
            type: "error",
            text: "Please select a different payment password to your login password",
          });
        }
      } else {
        this.$notify({
          group: "notify",
          type: "error",
          text: "Please make sure your payment password is between 8 to 20 characters and contains at least 1 alphabetical and 1 numerical charater",
        });
      }
    },
    // nextField: function (n) {
    //   if (n.length< this.digit) {
    //     this.$nextTick(() => {
    //       if (this.$refs.smscode[n.length - 1].value != "") {
    //         this.$refs.smscode[n].focus();
    //       }
    //     });
    //   } else if (this.smscode.length === this.digit - 1) {
    //     this.$nextTick(() => {
    //       this.verify();
    //     });
    //   }
    // },
    registerAccountByEmail: async function () {
      console.log("register by email")
      try {
        let registerByEmailResult = await registerByEmail(
          this.name,
          this.password
        );
        if (
          registerByEmailResult &&
          registerByEmailResult.returnCode === 0 &&
          registerByEmailResult.data &&
          registerByEmailResult.data.userId
        ) {
          if (registerByEmailResult.data.code) {
            console.log("dataCode", registerByEmailResult.data.code);
            setEmail(this.name);
            alert(registerByEmailResult.data.code);
            this.scene = 3;
          } else {
            this.$notify({
              group: "notify",
              type: "error",
              text: "Register via email server error",
            });
          }
        } else {
          this.$notify({
            group: "notify",
            type: "error",
            text: "Cannot register via email",
          });
        }
      } catch (error) {}
    },
    verifySmsCode: async function () {
      if (this.name && this.smscode && this.paymPassword) {
        console.log("getEurusPublicKey", getEurusPublicKey())
        console.log("getEurusPublicKey", getEurusPrivateKey())
        try {
          let verificationResult = await verification(
            this.name,
            this.smscode,
            getEurusPublicKey()
          );
          console.log(verificationResult)
          if (
            verificationResult &&
            verificationResult.returnCode === 0 &&
            verificationResult.data &&
            verificationResult.data.userId &&
            verificationResult.data.email &&
            verificationResult.data.mnemonic &&
            verificationResult.data.token &&
            getEurusPrivateKey()
          ) {
            await this.setupPaymentWallet(
              verificationResult,
              getEurusPrivateKey()
            );
            this.$router.push({ path: "/" });
            console.log(
              "verificationResult",
              verificationResult,
              "getEurusPrivateKey()",
              getEurusPrivateKey()
            );
          } else {
            if (verificationResult && verificationResult.returnCode === -1) {
              this.$message("Invalid Verification Code", "warning");
            } else if (
              verificationResult &&
              verificationResult.returnCode === -9
            ) {
              this.$notify({
                group: "notify",
                type: "error",
                text: "Code Expired",
              });
            } else {
              this.$notify({
                group: "notify",
                type: "error",
                text: "Internal Error",
              });
            }
            // this.$refs.smscode[0].focus();
            // this.sms = [];
          }
        } catch (error) {
          console.log(error);
        }
      }
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
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  overflow: hidden;
}

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
