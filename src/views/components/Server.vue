<template>
  <div class="server">
    <div class="server__info-container" :class="{'server__info-container--countdown' : (info.status=='Countdown')}">
      <div class="server__map">
        <span class="flag-icon" :class="countryflag"></span>
        <img :src="backgroundImage">
      </div>
      <div class="server__info">
        <ul>
          <li>Host: {{ info.address() }}</li>
          <li>
            Players: {{ info.players.length }}
            <span v-if="teams.length > 1">| Teams: {{ teams[0] || '???' }} vs {{ teams[1] || '???' }}</span>
          </li>
          <li>
            Observers: {{ info.observercount }}
          </li>
          <li>Map: {{ info.map }}</li>
          <li>Status: {{ info.status }}</li>
        </ul>
      </div>
      <ul class="server__buttons">
        <li class="server__buttons__play" @click="info.play()"><i class="fa fa-play-circle"></i></li>
        <li class="server__buttons__observe" @click="info.observe()"><i class="fa fa-eye"></i></li>
      </ul>
    </div>
    <div class="server__details" @click="toggleDetails" :class="{ 'server__details--expanded': detailsVisible }">
      <i class="fa fa-angle-double-down" v-if="! detailsVisible"></i>
      <server-details v-else></server-details>
    </div>
  </div>
</template>

<script>
import ServerDetails from './ServerDetails';
export default {
  props: [ 'info' ],
  components: { ServerDetails },
  data() {
    return { detailsVisible: false }
  },
  methods: {
    toggleDetails() {
      this.detailsVisible = ! this.detailsVisible;
    }
  },
  computed: {
    backgroundImage() {
      return `http://metaqtv.duelmania.net/levelshots/${ this.info.map }.jpg`;
    },
    teams() {
      const teams = new Set();
      this.info.players.forEach(player => {
        teams.add(player.team);
      });
      return [...teams];
    },

    countryflag() {
      return `flag-icon-${this.info.country.toLowerCase()}`;
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/variables";
@import "../../../node_modules/flag-icon-css/sass/flag-icon";

.server {
  @keyframes pulse
  {
    0% { opacity: 1 }
    100% { opacity: 0.7 }
  }

  &__info-container {
    position: relative;
    padding: 5px;
    clear: both;
    // border-bottom: 1px solid darken($backgroundColor, 15%);
    height: 71px;

    &--countdown {
      animation: pulse 1s infinite;
    }
  }

  &__map {
    width: 110px;
    height: 70px;
    background-size: cover;
    float: left;
    background-image: url(/static/levelshots/_notfound.jpg);
    border: 2px solid darken($backgroundColor, 2%);
    box-sizing: border-box;
    // position: absolute;
    // top: 0;

    .flag-icon {
      position: absolute;
    }

    img { width: 100%; height: 100%; }
  }

  &__info {
    position: absolute;
    left: 115px;
    margin-left: 5px;
    font-size: 12px;
  }

  &__buttons {
    position: absolute;
    right: 10px;
    font-size: 20px;
    text-align: center;
    color: lighten($backgroundColor, 20%);
    cursor: pointer;

    li:hover {
      color: lighten($backgroundColor, 40%);
    }
  }

  &__details {
    clear: both;
    height: 15px;
    background-color: darken($backgroundColor, 5%);
    color: lighten($backgroundColor, 50%);
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    border-bottom: 1px solid darken($backgroundColor, 15%);

    &--expanded {
      height: auto;
      padding-bottom: 5px;
    }
  }


}
</style>
