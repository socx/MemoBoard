/* eslint-disable no-var */
/* Sets up a Virtual DOM environment for tests please see: http://airbnb.io/enzyme/docs/guides/jsdom.html */
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<html></html>');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.$ = require('jquery')(window);
global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
/* eslint-enable */
