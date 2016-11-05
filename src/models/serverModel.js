import ls from '../helpers/storage';

class Server {
  constructor({ hostname, ip, country, link, map, observercount, players, playlink, port, qtvstream, status, watchlink }) {
    this.hostname = hostname;
    this.ip = ip;
    this.country = country;
    this.link = link;
    this.map = map;
    this.observercount = observercount;
    this.players = players;
    this.playlink = playlink;
    this.port = port;
    this.qtvstream = qtvstream;
    this.status = status;
    this.watchlink = watchlink;
  }

  address() {
    return `${this.hostname}:${this.port}`;
  }

  play() {
    if (ls.get('settings').copyToClipboard === true) {
      this._copy(this.address(), 'text');
    } else {
      if (process.env.NODE_ENV === 'development') {
        window.open(this.playlink);
      } else {
        chrome.tabs.create( { url: this.playlink } )
      }
    }
  }

  observe() {
    if (ls.get('settings').copyToClipboard === true) {
      this._copy(`qtvplay ${this.qtvstream}`, 'text');
    } else {
      if (process.env.NODE_ENV === 'development') {
        window.open(this.watchlink);
      } else {
        chrome.tabs.create( { url: this.watchlink } )
      }
    }
  }

  _copy(str, mimetype) {
		document.oncopy = function(event) {
			event.clipboardData.setData(mimetype, str);
			event.preventDefault();
		};
		document.execCommand("Copy", false, null);
	}
}

export default Server;
