<template>
  <div>
    <app-header subtitle="Settings" backRoute="/home" />
    <main class="main">
      <div class="list-container">
        <div
          class="list-item"
          v-for="item in options"
          :key="item.name"
          @click="item.handler"
        >
          <div class="setting-icon">
            <i class="material-icons">{{ item.icon }}</i>
          </div>
          <div class="list-item-content">
            <div>{{ item.name }}</div>
            <div>{{ item.description }}</div>
          </div>
        </div>
      </div>
      <language-modal />
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LanguageModal from "./LanguageModal.vue"
export default {
  data() {
    return {
      options: [
        {
          icon: "security",
          name: "Security",
          description:
            "Change the security settings (PIN Code, PIN digits and Lock timer)",
          handler: () => this.goToSecurityPage(),
        },
        {
          icon: "language",
          name: "Language",
          description: "Change the Language of the Eurus Wallet",
          handler: () => this.showLanguageModal(),
        },
        {
          icon: "help",
          name: "Help",
          description:
            "Need help? Our FAQ, Customer Service, Terms and Conditions goes here",
          handler: () => this.goToHelpCenter(),
        },
      ],
    };
  },
  components: {
    LanguageModal,
  },
  methods: {
    goToSecurityPage() {
      console.log("hello");
      this.$router.push("/settings/security");
    },
    goToHelpCenter() {
      this.$router.push("/settings/helpcenter");
    },
    showLanguageModal() {
      this.$modal.show("modal-language");
    },
  },
};
</script>
