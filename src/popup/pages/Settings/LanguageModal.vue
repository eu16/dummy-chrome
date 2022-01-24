<template>
  <modal
    name="modal-language"
    :adaptive="true"
    transition="scale"
    :width="300"
    height="auto"
  >
    <div class="modal-header">Change Language</div>
    <div class="modal-body">
      <radio-button
        name="options"
        v-for="item in dataArray"
        :key="item.data"
        :label="item.label"
        :data="item.data"
        :value="lang"
        @change="changeLanguage"
      />
    </div>
    <div class="modal-footer">
      <div class="secondary" @click="$modal.hide('modal-language')">CLOSE</div>
      <div class="primary" @click="saveLanguage">SAVE</div>
    </div>
  </modal>
</template>

<script>
import { getLocale, setLocale } from "../../../services/utils/auth";

export default {
  data() {
    return {
      lang: "",
      dataArray: [
        { label: "English", data: "en" },
        { label: "简体中文", data: "zh-cn" },
        { label: "繁體中文", data: "zh-hk" },
      ],
      lang: getLocale(),
    };
  },
  methods: {
    changeLanguage(newValue) {
      this.newLang = newValue
    },
    saveLanguage(){
      setLocale(this.newLang)
      this.$modal.hide("modal-language");
    }
  },
};
</script>
