import { SAVE_SETTINGS, LOAD_SETTINGS } from '../mutation-types';
import _ from 'lodash';

const state = {
  hide1p: false,
  copyToClipboard: false,
  observerThreshold: 0
}

const mutations = {
  [SAVE_SETTINGS](state, { key, value }) {
    state[key] = value;
  },
  [LOAD_SETTINGS](state, settings) {
    setTimeout(() => {
      for(let key in settings) {
        state[key] = settings[key];
      }
    }, 0);
  },
}

export default {
  state, mutations
}
