import Vue from 'Vue';
import _ from 'lodash';
import * as types from './mutation-types';

export const parseServers = ({ commit, state }, servers) => {

  commit(types.FETCHING_SERVERS);

  servers.forEach(server => {
    if(! _.find(state.servers.list, s => { return s.playlink == server.playlink })) {
      commit(types.ADD_SERVER, server);
    } else {
      commit(types.UPDATE_SERVER, server, {silent: true});
    }
  });

  if(state.servers.list.length) {
    state.servers.list.forEach(server => {
      if(! _.find(servers, s => { return s.playlink == server.playlink })) {
        commit(types.REMOVE_SERVER, server);
      }
    })
  }

  commit(types.DONE_FETCHING_SERVERS);  

}

export const parseStreams = ({ commit, state }, streams) => {

  commit(types.FETCHING_STREAMS);

  streams.forEach(stream => {
    if(! _.find(state.streams.list, s => { return s.name == stream.name })) {
      commit(types.ADD_STREAM, stream);
    } else {
      commit(types.UPDATE_STREAM, stream, {silent: true});
    }
  });

  if(state.streams.list.length) {
    state.streams.list.forEach(stream => {
      if(! _.find(streams, s => { return s.name == stream.name })) {
        commit(types.REMOVE_STREAM, stream);
      }
    })
  }

  commit(types.DONE_FETCHING_STREAMS);  

}

export const updateSetting = ({ commit }, {key, value}) => {
  commit(types.SAVE_SETTINGS, {key, value});
}