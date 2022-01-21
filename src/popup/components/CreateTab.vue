<template>
  <nav class="header-tabs">
    <router-link :class="{ active: myroute.name == 'create-wallet' }" to="/create-wallet">{{ $t("register.create_an_account") }}</router-link>
    <router-link :class="{ active: myroute.name == 'import-wallet' }" to="/import-wallet">{{ $t("login.login_with_central") }}</router-link>
    <router-link
      :class="{
        active: myroute.name == 'connect-metamask-wallet',
      }"
      to="/connect-metamask-wallet"
    >{{ $t("login.login_with_metamask") }}</router-link>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    subtitle: {
      default: false
    }
  },
  computed: mapState({
    myroute: state => state.route
  })
};
</script>
