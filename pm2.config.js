module.exports = {
  apps : [{
    name: 'cluster-app',
    script: 'build/server.js',
    instances: "MAX",
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    exec_mode:"cluster",
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
    }
  }]
};
