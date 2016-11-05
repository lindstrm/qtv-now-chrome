<template>
  <div class="p5">
    <div class="pb5">
      <div class="bold pb5">Launch</div>
      <label for="copyToClipboard">
        <input type="checkbox" @click="toggleSetting" id="copyToClipboard" name="copyToClipboard" :checked="isChecked('copyToClipboard')">
        Copy to clipboard instead of launching.
      </label>
    </div>
    <div class="pb5">
      <div class="bold pb5">List</div>
      <label for="hide1p">
        <input type="checkbox" @click="toggleSetting" id="hide1p" name="hide1p" :checked="isChecked('hide1p')">
        Hide servers with one player.
      </label>
    </div>
    <div>
      <div class="bold pb5">Notices</div>
      <label for="hide1p">
        <input type="text" name="observerThreshold" size="1" v-model="observerThreshold">
        Number of observers before alerting. (0 = off)
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data() { return { observerThreshold: null }},
  created() { this.observerThreshold = this.$store.state.settings.observerThreshold },
  watch: {
    observerThreshold(value) {
      this.$store.dispatch('updateSetting', { key: 'observerThreshold', value});
    }
  },
  methods: {
    toggleSetting(el) {
      const key = el.target.name;
      const value = el.target.checked;
      this.$store.dispatch('updateSetting', {key, value});
    },
    isChecked(setting) {
      return this.$store.state.settings[setting]
    }
  }
}
</script>

<style media="screen">
  .pb5 {
    padding-bottom: 5px;
  }
  label {
  display: block;
  padding-left: 15px;
  text-indent: -15px;
}
input[type="checkbox"] {
  width: 13px;
  height: 13px;
  padding: 0;
  margin:0;
  vertical-align: bottom;
  position: relative;
  top: -1px;
  *overflow: hidden;
}
</style>
