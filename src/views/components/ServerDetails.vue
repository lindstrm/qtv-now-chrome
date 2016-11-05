<template>
  <div>
    <div class="score-summary" v-if="scoreboard.length > 1">
      {{ scoreboard[0].team }} <span class="bold highlight">{{ scoreboard[0].score }}</span> vs 
      <span class="bold highlight">{{ scoreboard[1].score }}</span> {{ scoreboard[1].team }}</div>
      <table>
        <thead>
          <th>Ping</th>
          <th>PL</th>
          <th>Frags</th>
          <th>Team</th>
          <th>Name</th>
        </thead>
        <tbody>
          <tr v-for="player in players">
            <td v-text="player.ping"></td>
            <td v-text="player.pl"></td>
            <td v-text="player.frags" :style="{ background: getColors(player) }" class="frags"></td>
            <td v-text="player.team"></td>
            <td v-text="player.name"></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  methods: {
    getColors(player) {
      return `-webkit-linear-gradient(top, ${this.colors[player.topcolor]} 50%, ${this.colors[player.bottomcolor]} 50%)`
    }
  },
  computed: {
    info() {
      return this.$parent.info;
    },
    scoreboard() {
      const scoreboard = [];

      this.$parent.teams.forEach(team => {
        const players = _.filter(this.info.players, player => { return player.team === team });
        const score = _.sumBy(players, 'frags');
        scoreboard.push({ players, score, team });
      })

      return scoreboard;
    },
    players() {
      return this.info.players.sort((a, b) => { return a.frags < b.frags})
    }
  },
  data() {
    return {
      colors: {
        0: '#ffffff',
        1: '#CC66FF',
        2: '#9966ff',
        3: '#CCCC99',
        4: '#CD3232',
        5: '#FFCC99',
        6: '#FFCC00',
        7: '#FFCCCC',
        8: '#CC66FF',
        9: '#FF99FF',
        10: '#FFFFCC',
        11: '#00CC99',
        12: '#DFE41B',
        13: '#4559BA',
        14: '#4559BA',
        15: '#4559BA'
      }
    }
  },
}
</script>

<style lang="scss">
  @import "../../assets/variables";

  .score-summary {
    background-color: darken($backgroundColor, 10%);
    padding: 5px;
    margin-bottom: 5px;
  }

  .frags {
    color: white;
    text-shadow: 1px 1px 1px #000;
  }

  table {
    margin: 0 5px;
    td, th { padding: 2px 5px; }
    th { color: white; font-weight: 700; }
    th { border-bottom: 1px solid lighten($backgroundColor, 20%);}
    th:last-child, td:last-child { width: 80%; text-align: left; }
  }

  .highlight {
    color: lighten($backgroundColor, 50%);
  }
</style>