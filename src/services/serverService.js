import Vue from 'vue';
import Server from '../models/serverModel';
import ls from '../helpers/storage';

const apiUrl = 'http://cors-anywhere.herokuapp.com/http://metaqtv.duelmania.net/api/v2/servers';

export const getActiveServers = () => {

  if(process.env.NODE_ENV === 'development') {
    return Vue.http.get(apiUrl)
      .then(response => response.body)
      .then(servers => servers.filter(server => server.mvdservers.length))
      .then(servers => servers.map(server => server.mvdservers.filter(s => s.players.length)))
      .then(servers => servers.filter(server => server.length))
      .then(servers => {
        const activeServers = [];
        servers.forEach(server => {
          server.forEach(mvdserver => {
            activeServers.push(new Server(mvdserver));
          })
        });
        return activeServers;
      });
  }
  return new Promise((resolve, reject) => {
    if(localStorage['servers']) {
      const servers = ls.get('servers');
      return resolve(servers.map(server => new Server(server)));
    }
    return reject();
  })
}
