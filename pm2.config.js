module.exports = {
  apps : [
    {
      name: 'cluster-app',
      script: 'build/server.js',
      instances: 2,
      autorestart: true,
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: '1G',
      out_file : "/tmp/cluster-app.log",
      log_date_format : "MM/DD/YYYY HH:mm:ss",
      // env: {
      //   URI_CHANNEL: 'amqp://rabbitmq',
      //   NODE_ENV: 'production',
      //   PORT: 3000,
      // }
    },
    {
      name: 'Worker1',
      script: 'build/broker/workers/fibonacci1.worker.js',
      out_file : "/tmp/worker-1.log",
      log_date_format : "MM/DD/YYYY HH:mm:ss",
      instances: 1
    },
    {
      name: 'Worker2',
      script: 'build/broker/workers/fibonacci2.worker.js',
      out_file : "/tmp/worker-2.log",
      log_date_format : "MM/DD/YYYY HH:mm:ss",
      instances: 1
    },
  ]
};
