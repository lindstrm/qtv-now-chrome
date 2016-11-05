import Vue from 'vue';
import Vuex from 'vuex';
import servers from './modules/servers.js';
import streams from './modules/streams.js';
import settings from './modules/settings.js';
import * as actions from './actions';
import * as getters from './getters';
import { save, load } from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    servers, settings, streams
  },
  actions,
  getters,
  plugins: [save, load],
});
