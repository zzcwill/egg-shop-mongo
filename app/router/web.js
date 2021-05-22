'use strict';

module.exports = app => {
  const { router, controller, config, middleware } = app;

  const { web } = controller

  router.redirect('/', '/test4');

  router.get('/test', web.test);
  router.get('/test2', web.test2);
  router.get('/test3', web.test3);
  router.get('/test4', web.test4);
  router.get('/test5', web.test5);
  router.get('/socket', web.socket);
  router.get('/socket2', web.socket2);
  router.get('/error', web.error);
};
