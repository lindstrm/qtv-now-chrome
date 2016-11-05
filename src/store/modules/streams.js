import { ADD_STREAM, REMOVE_STREAM, UPDATE_STREAM, FETCHING_STREAMS, DONE_FETCHING_STREAMS } from '../mutation-types';

const state = {
  list: [],
  fetching: false,
  lastUpdate: ''
}

const mutations = {
  [ADD_STREAM](state, stream) {
    state.list.push(stream);
  },
  [UPDATE_STREAM](state, stream) {
      _.assignIn(_.find(state.list, s => { return s.name == stream.name }), stream);
  },
  [REMOVE_STREAM](state, stream) {
    state.list = _.reject(state.list, s => { return s.name === stream.name });
  },
  [FETCHING_STREAMS](state) {
    state.fetching = true;
  },
  [DONE_FETCHING_STREAMS](state) {
    state.fetching = false;
    state.lastUpdate = new Date().getTime();
  }
}

export default {
  state, mutations
};
