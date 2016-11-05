<template>
  <div class="scroll">
    <ul class="list">
      <li
        is="Stream"
        v-for="stream in $store.state.streams.list"
        :info="stream"
      >

      </li>
    </ul>
  </div>
</template>

<script>
import Stream from './components/Stream';
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);
export default {
  components: { Stream },
  data() {
    return { }
  },
  mounted() {
    $('.scroll').mCustomScrollbar({
          scrollInertia: 0,
          autoHideScrollbar: true,
          theme: 'dark-thick',
          mouseWheel: {
              scrollAmount: 53
          }
      });
  },

  methods: {

  }
}
</script>

<style lang="css">
</style>
