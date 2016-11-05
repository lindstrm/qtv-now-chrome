export const activeServers = state => {
  return state.servers.list;
}

export const totalObserverCount = state => {
  let count = 0;
  state.servers.list.forEach(server => count += server.observercount)
  return count;
};

export const totalPlayerCount = state => {
  let count = 0;
  state.servers.list.forEach(server => count += server.players.length)
  return count;
};
