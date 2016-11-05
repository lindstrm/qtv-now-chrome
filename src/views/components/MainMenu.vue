<template>
  <ul class="main-menu">
    <li class="main-menu__item"><router-link to="/servers"><i class="fa fa-gamepad"></i></router-link></li>
    <li class="main-menu__item">
      <router-link to="/twitch">
        <div class="stream-count-badge" v-if="streamCount" v-text="streamCount"></div>
        <i class="fa fa-twitch"></i>
      </router-link>
    </li>
    <li class="main-menu__item"><router-link to="/settings"><i class="fa fa-cog"></i></router-link></li>
    <li class="main-menu__item"><router-link to="/about"><i class="fa fa-info-circle"></i></router-link></li>
  </ul>
</template>

<script>
export default {
  computed: {
    streamCount() {
      return this.$store.state.streams.list.length;
    }
  }
};
</script>

<style lang="scss">
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);
@import '../../assets/variables';

.main-menu {
  flex: 0.1;
  background-color: $menuBGColor;
  font-size: 20px;

  &__item {
    position: relative;
  }

  .stream-count-badge {
    position: absolute;
    font-size: 9px;
    top: 0;
    right: 0px;
    padding: 2px;
    background-color: rgb(130, 111, 208);
    border-radius: 35%;
    color: white;
  }

  a {
    display: block;
    padding: 10px;
    background-color: transparent;
    color: lighten($backgroundColor, 10%);
  }

  .router-link-active, a:hover {
    background-color: darken($backgroundColor, 5%);
    color: lighten($backgroundColor, 20%);
  }
}
</style>
