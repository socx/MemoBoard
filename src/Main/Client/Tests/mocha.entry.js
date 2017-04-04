/* eslint-disable no-var */
/* Require all of the tests in the project with -Test.js in their filename please see: http://nicolasgallagher.com/how-to-test-react-components-karma-webpack/ */
var context = require.context('../../../', true, /.+\-Test\.jsx?$/);
context.keys().forEach(context);
module.exports = context;

/* eslint-enable */
