<template>
  <nav class="header-tabs">
    <router-link :class="{ active: myroute.name == 'create-wallet' }" to="/create-wallet">Register Account</router-link>
    <router-link :class="{ active: myroute.name == 'import-wallet' }" to="/import-wallet">Centralized Login</router-link>
    <router-link
      :class="{
        active: myroute.name == 'connect-hardware-wallet',
      }"
      to="/connect-hardware-wallet"
    >Dentralized Login</router-link>
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
