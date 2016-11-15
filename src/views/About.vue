<template>
  <div class="scroll">
    <div class="p5">
      <div class="rip" title="Rest in peace, Atrophy">†</div>
      QTV Now 2.0 made by delete.

    	<h4>Contact</h4>
    	You can reach me on <a href="http://discord.quake.world" class="link">discord</a> or by <a href="mailto:manellermus@gmail.com?subject=QTV+Now" class="link">email</a>.
      <br>
      Issues can be reported <a href="https://github.com/lindstrm/qtv-now/issues" class="link">here</a> aswell.

    	<h4>Thanks to</h4>
    	D0PESK1LLZ for supplying the api.

    	<h4>Changelog</h4>
      <strong>2.0.1 - 15 Nov 16</strong>
      <ul>
        <li>Fix observer notification bug.</li>
      </ul>

      <strong>2.0.0 - 5 Nov 16</strong>
      <ul>
        <li>Complete rewrite of the entire extension.</li>
      </ul>

      <strong>1.5.3 - 7 Aug 14</strong>

      <ul>
        <li>Update to reflect changes in the QTV Api.</li>
      </ul>

      <strong>1.5.0 - 4 June 14</strong>

      <ul>
        <li>Added an experimental ping meter. Note; this feature might not be totally accurate and it might not work on all servers. It can be turned off in the options.</li>
      </ul>

  		<strong>1.4.7 - 5 May 14</strong>
      <ul>
        <li>Fix for the occasional faulty scrollbar.</li>
      </ul>

  		<strong>1.4.6 - 9 Feb 14</strong>
      <ul>
        <li>Old icon font is back.</li>
      </ul>

      <strong>1.4.5 - 1 Feb 14</strong>
      <ul>
        <li>Had to change icon font because the last one was not working correctly in the latest chrome and windows8</li>
      </ul>

    	<strong>1.4.4 - 25 Jan 14</strong>
      <ul>
        <li>Fixed an issue that was causing the popup to be slow when someone was streaming.</li>
        <li>Fixed a bug that caused the list not to be retrieved when loading the addon for the first time.</li>
      </ul>
  		<strong>1.4.0 - 17 Dec 13</strong>
      <ul>
        <li>Added a demo browser.</li>
        <li>Added a notifier on X amount of observers.</li>
      </ul>

    	<strong>1.3.0 - 16 Dec 13</strong>
      <ul>
        <li>You can now hide servers with only one player.</li>
      </ul>

    	<strong>1.2.0 - 21 Nov 13</strong>
      <ul>
        <li>Added a page dedicated to Quake streams on Twitch. If you want your stream to pop up on it just set the game to <strong>Quake</strong>.</li>
      </ul>

      <strong>1.1.0 - 20 Nov 13</strong>
      <ul>
        <li>Added the option to copy the watch and play path instead of launching qw.</li>
      </ul>

    	<strong>1.0.2 - 19 Nov 13</strong>
      <ul>
        <li>Removed display of undefined teams.</li>
        <li>Fixed a bug that was causing the qtv files to be downloaded twice.</li>
      </ul>

  		<strong>1.0 - 19 Nov 13</strong>
      <ul>
        <li>Initial release.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import scroll from './mixins/scroll';
export default {
  mixins: [scroll],
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.rip {
  position: absolute;
  right: 10px;
  color: lighten($backgroundColor, 15%);
  cursor: default;
}
ul {
  margin-top: 10px;
}
ul:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>
