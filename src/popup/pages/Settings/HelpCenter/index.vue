<template>
  <div>
    <app-header subtitle="Security" backRoute="/settings" />
    <main class="main">
      <div
        class="list-item"
        v-for="item in options"
        :key="item.title"
        @click="item.handler"
      >
        {{ item.title }}
      </div>
      <!-- <pindigits-modal />
      <locktimer-modal /> -->
    </main>
  </div>
</template>

<script>
// import PindigitsModal from "./PindigitsModal";
// import LocktimerModal from "./LocktimerModal";
export default {
  data() {
    return {
      options: [
        {
          title: "Frequently Asked Questions",
          handler: () => window.open("https://www.eurus.network/support/eurus-wallet/")
        },
        {
          title: "Customer Service",
          handler: () => this.showLockTimerModal(),
        },
        { title: "Terms & Conditions", handler: () => window.open("https://www.eurus.network/support/terms-of-use/") },
      ],
    };
  },
  //   components: {
  //     PindigitsModal,
  //     LocktimerModal,
  //   },
  methods: {
    changePincode() {
      this.$router.push("/settings/security/pincode");
    },
    showPindigitsModal() {
      this.$modal.show("modal-pindigits");
    },
    showLockTimerModal() {
      this.$modal.show("modal-locktimer");
    },
  },
};
</script>
<style></style>
