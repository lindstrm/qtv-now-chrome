let updateTimer;
const ls = {};
ls.get = key => {
  if(localStorage[key]) {
    return JSON.parse(localStorage[key]);
  }
  return false;
}
ls.save = (key, value) => {
  localStorage[key] = JSON.stringify(value);
  return value;
}
const settings = ls.get('settings') || { hide1p: false, copyToClipboard: false, observerThreshold: 0 };
const openInterval = 10000;
const closedInterval = 60000;

const qtvapi = 'http://metaqtv.duelmania.net/api/v2/servers';
chrome.browserAction.setBadgeBackgroundColor({ color: '#4c473a'})

const grabServers = () => {
  fetch(qtvapi)
    .then(response => response.json())
    .then(servers => servers.filter(server => server.mvdservers.length))
    .then(servers => servers.map(server => server.mvdservers.filter(s => s.players.length)))
    .then(servers => servers.filter(server => server.length))
    .then(servers => {
      const activeServers = [];
      servers.forEach(server => {
        server.forEach(mvdserver => {
          activeServers.push(mvdserver);
        })
      });

      setBadgeText(activeServers);
      checkObservers(activeServers);

      ls.save('servers', activeServers);
    });
}

const checkObservers = servers => {
  servers.forEach(server => {
    const noticedServers = ls.get('noticedServers') || [];
    const host = `${server.hostname}:${server.port}`;

    if(server.observercount > settings.observerThreshold && noticedServers.indexOf(host) === -1) {
      console.log(server);

      chrome.notifications.create(`notification.${server.qtvstream}`, notificationOptions(server));
      chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
        chrome.tabs.create( { url: server.watchlink } )
      })

      noticedServers.push(host)

      ls.save('noticedServers', noticedServers);
    }
    else if(server.observercount < settings.observerThreshold && noticedServers.indexOf(host) > -1) {
      ls.save('noticedServers', noticedServers.splice(noticedServers.indexOf(host), 1));
    }
  })
}

const grabServersTimer = () => {
  grabServers()
  let interval = ls.save('interval', getIntervalTime());

  updateTimer = setTimeout(() => {
    grabServersTimer()
  }, interval);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  clearTimeout(updateTimer);
  if(request.open == true) {
    grabServersTimer();
  }
});

const getIntervalTime = () => {
    if(isPopupOpen()) {
      return openInterval;
    }
    return closedInterval;
}

const isPopupOpen = () => {
  return !! chrome.extension.getViews({ type: "popup" }).length;
}

const setBadgeText = (servers) => {
  if(ls.get('settings').hide1p === true) {
    servers = servers.filter(server => server.players.length > 1);
  }
  
  if(servers.length > 0) {
    chrome.browserAction.setBadgeText({ text: String(servers.length) })
  } else {
    chrome.browserAction.setBadgeText({ text: '' })
  }
}

const notificationOptions = server => {
  return {
    type: "basic",
    title: `Observer alert!`,
    buttons: [{ title: 'watch'}],
    message: `${server.hostname}:${server.port} has reached ${server.observercount} observers!`,
    iconUrl: `http://metaqtv.duelmania.net/levelshots/${server.map}.jpg`
  }
}

grabServersTimer(closedInterval);
