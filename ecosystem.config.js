module.exports = {
  apps: [
    {
      name: "healthy-life-dish",
      script: "/home/alashchev17/.nvm/versions/node/v22.14.0/bin/yarn",
      args: "start",
      cwd: "/var/www/healthy-life-dish",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
