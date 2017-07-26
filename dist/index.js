!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("SequentialPromiseProcessor",[],t):"object"==typeof exports?exports.SequentialPromiseProcessor=t():e.SequentialPromiseProcessor=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,r){"use strict";function n(e){var t=void 0===e?"undefined":u(e);return null!==e&&("object"===t||"function"===t)&&"function"==typeof e.then}Object.defineProperty(t,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SequentialPromiseProcessor=t.isThenable=t.default=void 0;var u=r(0),o=n(u),i=r(2),a=n(i);t.default=a.default,t.isThenable=o.default,t.SequentialPromiseProcessor=a.default},function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){if(this.state===c){var e=this.queue[0];if(e.calls>0)return;var t=e.factory();if(e.calls++,(0,f.default)(t))try{t.then(i.bind(this),a.bind(this))}catch(e){a.call(this,e)}else a.call(this,new TypeError)}}function i(){this.queue.shift(),this.queue.length>0?o.call(this):this.state===c&&(this.state=y)}function a(e){this.queue=[],this.state===c&&(this.state=y),null!=e&&console.error(e)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),f=function(e){return e&&e.__esModule?e:{default:e}}(l),c=1,y=null,h=new Map,p=function(){function e(){return u(this,e),h.set(this,Object.create(null,{queue:{value:[],writable:!0},state:{value:y,writable:!0}})),arguments.length>0?this.queue.apply(this,arguments):this}return s(e,[{key:"queue",value:function(){for(var e=this,t=h.get(this).queue,r=arguments.length,u=Array(r),o=0;o<r;o++)u[o]=arguments[o];return u.forEach(function(r){if(Array.isArray(r))return e.queue.apply(e,n(r));if("function"==typeof r){var u=Object.create(null,{calls:{value:0,writable:!0},factory:{value:r}});t.push(u)}}),this}},{key:"unqueue",value:function(){for(var e=this,t=arguments.length,r=Array(t),u=0;u<t;u++)r[u]=arguments[u];return r.forEach(function(t){if(Array.isArray(t))return e.unqueue.apply(e,n(t));if("function"==typeof t){e.pause();var r=h.get(e).queue;r.filter(function(e,n){e.factory===t&&r.splice(n,1)}),e.resume()}}),this}},{key:"process",value:function(){return h.get(this).state===y?this.resume():this}},{key:"resume",value:function(){var e=h.get(this);return e.state!==c&&e.queue.length>0&&(e.state=c,o.call(e)),this}},{key:"pause",value:function(){var e=h.get(this);return e.state===c&&(e.state=0),this}},{key:"cancel",value:function(){return a.call(h.get(this)),this}}]),e}();t.default=p}])});