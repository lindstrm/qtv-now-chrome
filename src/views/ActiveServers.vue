<template>
  <div class="active-servers scroll">
    <ul class="list">
      <li v-for="server in activeServers" v-if="! hidden(server)"><server :info="server"></server></li>
    </ul>
  </div>
</template>

<script>
import Server from './components/Server.vue';
import scroll from './mixins/scroll';
export default {
  name: 'ActiveServers',
  mixins: [scroll],
  components: { Server },
  methods: {
    hidden(server) {
      if (this.$store.state.settings.hide1p && server.players.length == 1) {
        return true;
      }
    }
  },
  computed: {
    activeServers() {
      return this.$store.getters.activeServers.sort((a,b) => {
        if (a.hostname < b.hostname)
          return -1;
        if (a.hostname > b.hostname)
          return 1;
        return 0;
      })
    },
  },
}
</script>

<style lang="scss">
@import "../assets/variables";

ul.list>li {
    background-color: lighten($backgroundColor, 10%);

    &:nth-child(odd) {
      background-color: lighten($backgroundColor, 5%);
    }

    &:not(:first-child) {
      border-top: 1px solid lighten($backgroundColor, 20%);
    }
}
</style>
