if(process.env.NODE_ENV === 'development')
    module.exports = require('./root.dev').default;
else
    module.exports = require('./root.prod').default;


