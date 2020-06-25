window._ = require('lodash');
import Cookies from 'js-cookie';
import CC from "cookieconsent";


window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#252e39"
      },
      "button": {
        "background": "#14a7d0"
      }
    },
    "theme": "edgeless",
    "type": "opt-out",
    "content": {
      "message": "This website uses cookies to ensure you get the best experience on our website",
      "dismiss": "Got it!",
      "deny": "Decline",
      "link": "Leran more!",
      "href": "/cookiepolicy"
    }
  });
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

//TOAST INIT
$('.toast').toast();
if(!Cookies.get('web_repo_toast'))
    $('#web_repo_info').toast('show');

$('#web_repo_info').on('hide.bs.toast', function () {
    Cookies.set('web_repo_toast', true, { expires : 10, path    : '/',  });
});
