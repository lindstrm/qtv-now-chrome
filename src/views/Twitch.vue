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
import scroll from './mixins/scroll';
export default {
  mixins: [scroll],
  components: { Stream },
  data() {
    return { }
  },
}
</script>

<style lang="css">
</style>
