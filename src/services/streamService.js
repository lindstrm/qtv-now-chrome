import ls from '../helpers/storage';
import Stream from '../models/streamModel';

const url = process.env.NODE_ENV === 'development' ?
  'http://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/streams?game=quake&client_id=q7b6jr3iek7xfdubm7lyrleuf3xpnh8' :
  'https://api.twitch.tv/kraken/streams?game=quake&client_id=q7b6jr3iek7xfdubm7lyrleuf3xpnh8'

export const getActiveStreams = () => {
  return fetch(url)
    .then(response => response.json())
    .then(json => json.streams)
    .then(streams => streams.map(stream => new Stream(stream)))
}

export default getActiveStreams;
