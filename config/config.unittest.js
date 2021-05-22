'use strict';
module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      port: 3000,
    },
  };

  return config;
};
