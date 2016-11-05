<template>
  <div id="app">
    <main-menu></main-menu>
    <div class="content-container">
      <div class="statusbar">
        Currently <span class="highlight">{{ $store.getters.totalPlayerCount }}</span> players and
        <span class="highlight">{{ $store.getters.totalObserverCount }}</span> observers on 
        <span class="highlight">{{ $store.state.servers.list.length }}</span> servers
      </div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from './views/components/MainMenu';
import { getActiveServers } from './services/serverService';
import { getActiveStreams } from './services/streamService';
import ls from './helpers/storage'
import $ from 'jquery';
export default {
  name: 'app',

  components: {
    MainMenu
  },

  data() {
    return { activeServers: [], lastUpdate: '' };
  },

  mounted() {
    setTimeout(() => {
      this.startServerTimer(true);
      this.startStreamTimer(true);
    }, 500);
    
    this.$router.push('/servers');
    
    $('body').on('click', 'a.link', event => {
      if (process.env.NODE_ENV === 'development') {
        window.open(event.target.href);
      } else {
        chrome.tabs.create( { url: event.target.href } )
      }
      event.preventDefault();
    })
  },

  methods: {
    startServerTimer(alwaysRun) {
      getActiveServers().then(servers => {
        this.$store.dispatch('parseServers', servers);
      });
      
      if(alwaysRun) {
        setTimeout(() => {
          this.startServerTimer(true)
        }, ls.get('interval') || 60000);
      }
    },
    startStreamTimer(alwaysRun) {
      getActiveStreams().then(streams => {
        this.$store.dispatch('parseStreams', streams);
      });

      if(alwaysRun) {
        setTimeout(() => {
          this.startStreamTimer(true)
        }, 180000);
      }
    }
  },
}
</script>

<style lang="scss">
@import "./assets/variables";
@import "./assets/defaults";
@import "./assets/mcs";

body, html {
  margin: 0;
  padding: 0;
  background-color: $backgroundColor;
  width: 400px;
  height: 490px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: lighten($backgroundColor, 50%);
  display: flex;
  flex-flow: row wrap;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 13px;
  height: 490px;

}

.content-container {
  flex: 4;
}

.scroll {
  height: 466px;
  overflow: hidden;
}

.statusbar {
  background-color: $menuBGColor;
  padding: 5px;
  color: lighten($menuBGColor, 30%);
  font-size: 12px;

  .higlight {
    color: lighten($menuBGColor, 60%);
  }
}

.bold {
  font-weight: 700;
}
.p5 {
  padding: 5px;
}
// * { box-sizing: border-box; }
</style>
