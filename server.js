var cluster = require('cluster');

cluster('app.js')
  .in('development')
    .set('workers', 1)
    .use(cluster.logger('logs', 'debug'))
    .use(cluster.debug())
    .use(cluster.repl(8888))
    .use(cluster.reload())
  .in('production')
    .set('workers', 4)
    .use(cluster.logger())
    .use(cluster.pidfiles())
  .in('all')
    .listen(3000);
