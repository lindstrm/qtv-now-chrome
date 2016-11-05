export default {
  get(key) {
    if(localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
  },

  save(key, content) {
    localStorage[key] = JSON.stringify(content);
  }
}
