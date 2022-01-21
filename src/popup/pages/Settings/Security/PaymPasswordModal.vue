<template>
  <div>
    <app-header
      v-if="!subModule"
      subtitle="Change your Payment Password"
      :backRoute="!subModule ? '/settings/security' : ''"
    />
    <div class="pincode-page" :class="{ main: !subModule }">
      <label class="input-label">
        {{ $t("passwordType.payment_pw") }}
        <input
          class="input-field"
          type="password"
          name="password"
          ref="password"
          v-model="oldPassword"
          :placeholder="$t('register.enter_pp')"
        />
      </label>
      <div>
        <br />
        <label class="input-label">
          {{ $t("passwordType.new_payment_pw") }}
          <input
            class="input-field"
            type="password"
            name="password"
            ref="password"
            v-model="newPassword"
            :placeholder="$t('register.enter_newPpPw')"
          />
        </label>
        <label class="input-label">
          {{ $t("passwordType.confirm_new_payment_pw") }}
          <input
            class="input-field"
            type="password"
            name="password_confirm"
            ref="password_confirm"
            v-model="newPassword_confirm"
            :placeholder="$t('register.enter_newPpPw')"
          />
        </label>
      </div>
      <div class="footer">
        <button
          class="primary flex mt-20"
          :disabled="!oldPassword || !newPassword || !newPassword_confirm"
          @click="submitNewPassword"
        >
          {{ $t("common.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { changePaymentSignature } from "./../../../../services/utils/api";
import { isAlphaNum, checkTextLength } from "../../../../services/utils/index";

export default {
  props: {
    method: {
      default: "create",
      type: String,
    },
    subModule: {
      default: true,
      type: Boolean,
    },
    onBack: {
      type: Function,
    },
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPassword_confirm: "",
    };
  },
  methods: {
    submitNewPassword() {
      if (
        isAlphaNum(this.newPassword) &&
        checkTextLength(this.newPassword, 8, 20)
      ) {
        if (this.newPassword_confirm === this.newPassword) {
          console.log("password is good to go");
          this.changePasswordPasswordApi();
        } else {
          console.log("old");
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
    },
    changePasswordPasswordApi: async function () {
      try {
        const changePaymentSignatureResult = await changePaymentSignature(
          this.oldPassword,
          this.newPassword
        );

        if (
          changePaymentSignatureResult &&
          changePaymentSignatureResult.returnCode === 0
        ) {
          this.$notify({
            group: "notify",
            type: "success",
            text: "Payment Password successfully Changed",
          });
        }
      } catch (error) {
        this.$notify({
          group: "notify",
          type: "error",
          text: "Couldn't change Payment Password",
        });
      }
    },
  },
};
</script>
<style scoped>
.pincode-page {
  text-align: center;
}
</style>
