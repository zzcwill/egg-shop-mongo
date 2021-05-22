'use strict';

module.exports = app => {
  require('./router/web')(app);
  require('./router/api')(app);
};