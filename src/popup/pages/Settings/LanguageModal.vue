<template>
  <modal name="modal-language" :adaptive="true" transition="scale" :width="300" height="auto">
    <div class="modal-header">Change Language</div>
    <div class="modal-body">
      <radio-button
        name="options"
        v-for="item in dataArray"
        :key="item.data"
        :label="item.label"
        :data="item.data"
        :value="lockTimer"
      />
    </div>
    <div class="modal-footer">
      <div class="secondary" @click="$modal.hide('modal-language')">CLOSE</div>
      <div class="primary" @click="saveTimeout">SAVE</div>
    </div>
  </modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    timeout: 30,
    dataArray: [
      {label: "English", data: "en"},
      {label: "简体中文", data: "zh-cn"},
      {label: "繁體中文", data: "zh-hk"},
    ]
  }),
  // computed: {
  //   ...mapState({
  //     lockTimer: state => state.settings.auth.timeout / 60 / 1000
  //   })
  // },
  methods: {
    // changeTimeout(newValue) {
    //   this.timeout = newValue;
    // },
    saveTimeout() {
      // this.$store.commit("settings/setTimeout", this.timeout * 60 * 1000);
      this.$modal.hide("modal-language");
    }
  }
};
</script>
