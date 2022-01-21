<template>
  <div>
    <app-header
      v-if="!subModule"
      subtitle="Change your Login Password"
      :backRoute="!subModule ? '/settings/security' : ''"
    />
    <div class="pincode-page" :class="{ main: !subModule }">
      <label class="input-label">
        {{ $t("passwordType.login_pw") }}
        <input
          class="input-field"
          type="password"
          name="password"
          ref="password"
          v-model="oldPassword"
          :placeholder="$t('login.enter_password')"
        />
      </label>
      <div>
        <br />
        <label class="input-label">
          {{ $t("passwordType.new_pw") }}
          <input
            class="input-field"
            type="password"
            name="password"
            ref="password"
            v-model="newPassword"
            :placeholder="$t('register.enter_newPw')"
          />
        </label>
        <label class="input-label">
          {{ $t("passwordType.conf_new_pw") }}
          <input
            class="input-field"
            type="password"
            name="password_confirm"
            ref="password_confirm"
            v-model="newPassword_confirm"
            :placeholder="$t('register.enter_newPw')"
          />
        </label>
      </div>
      <div class="footer">
        <button class="primary flex mt-20" :disabled="!oldPassword || !newPassword || !newPassword_confirm" @click="submitNewPassword">
          {{ $t("common.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeLoginSignature } from "./../../../../services/utils/api";
import { isAlphaNum, checkTextLength } from "../../../../services/utils/index"


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
          this.changeLoginPasswordApi();
        } else {
            console.log("new")
          this.$notify({
            group: "notify",
            type: "error",
            text: "New Passwords are not matching",
          });
        }
      } else {
        console.log("old")
        this.$notify({
          group: "notify",
          type: "error",
          text: "Please make sure your password is between 8 to 20 characters and contains at least 1 alphabetical and 1 numerical charater",
        });
      }
    },
    changeLoginPasswordApi: async function () {
      try {
        const changeLoginPasswordApiResult = await changeLoginSignature(
          this.oldPassword,
          this.newPassword
        );

        if (
          changeLoginPasswordApiResult &&
          changeLoginPasswordApiResult.returnCode === 0
        ) {
          this.$notify({
            group: "notify",
            type: "success",
            text: "Login Password successfully Changed",
          });
        }
      } catch (error) {
        this.$notify({
          group: "notify",
          type: "error",
          text: "Couldn't change Login Password",
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
