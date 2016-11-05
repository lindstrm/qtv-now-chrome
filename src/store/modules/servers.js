import { FETCHING_SERVERS, DONE_FETCHING_SERVERS, ADD_SERVER, UPDATE_SERVER, REMOVE_SERVER } from '../mutation-types';
import _ from 'lodash';

const state = {
  list: [],
  fetching: false,
  lastUpdate: null,
}

const mutations = {
  [ADD_SERVER](state, server) {
    state.list.push(server);
  },
  [UPDATE_SERVER](state, server) {
      _.assignIn(_.find(state.list, s => { return s.playlink == server.playlink }), server);
  },
  [REMOVE_SERVER](state, server) {
    state.list = _.reject(state.list, s => { return s.playlink === server.playlink });
  },
  [FETCHING_SERVERS](state) {
    state.fetching = true;
  },
  [DONE_FETCHING_SERVERS](state) {
    state.fetching = false;
    state.lastUpdate = new Date().getTime();
  }
}

export default {
  state, mutations
}
