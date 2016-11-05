<template>
  <li class="stream p5" @click="watch">
    <img :src="info.preview.small" alt="" class="stream__preview"/>
    <div class="stream__info">
      <ul>
        <li><span class="bold">{{ info.name }}</span> | {{ info.viewers }} viewers</li>
        <li>Status: {{ info.status }}</li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: [ 'info' ],
  methods: {
    watch() {
      const watchlink = `http://twitch.tv/${this.info.channel.name}`;

      if (process.env.NODE_ENV === 'development') {
        window.open(watchlink);
      } else {
        chrome.tabs.create( { url: watchlink } )
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
@import "../../assets/variables";

.stream {
  position: relative;
  cursor: pointer;
  padding: 5px;
  height: 45px;
  overflow: hidden;

  &__preview {
    background-size: cover;

    img { width: 100%; height: 100%; }
  }

  &__info {
    position: absolute;
    left: 85px;
    top: 5px;
    margin-left: 5px;
    font-size: 12px;
  }
}
</style>
