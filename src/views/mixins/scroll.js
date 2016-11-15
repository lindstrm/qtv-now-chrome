var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

export default {
  mounted() {
    $('.scroll').mCustomScrollbar({
      scrollInertia: 0,
      autoHideScrollbar: true,
      theme: 'dark-thick',
      mouseWheel: {
        scrollAmount: 53
      }
    });
  }
};
