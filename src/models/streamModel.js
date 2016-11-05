class Stream {
  constructor({ created_at, channel, viewers, preview }) {
    this.channel = channel;
    this.startedAt = created_at;
    this.name = channel.display_name;
    this.status = channel.status;
    this.viewers = viewers;
    this.preview = preview;
  }
}

export default Stream;
