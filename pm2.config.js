module.exports = {
  apps : [
    {
      name: 'Express App',
      script: 'build/server.js',
      instances: 2,
      autorestart: true,
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: '1G',
      // env: {
      //   URI_CHANNEL: 'amqp://rabbitmq',
      //   NODE_ENV: 'production',
      //   PORT: 3000,
      // }
    },
    {
      name: 'Worker1',
      script: 'build/broker/workers/fibonacci1.worker.js',
      instances: 1
    },
    {
      name: 'Worker2',
      script: 'build/broker/workers/fibonacci2.worker.js',
      instances: 1
    },
  ]
};
