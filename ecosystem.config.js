module.exports = {
  apps: [
    {
      name: "sv-web",
      cwd: "./web",
      script: "npm",
      args: "start",
      exp_backoff_restart_delay: 0,
    },
    {
      name: "sv-api",
      cwd: "./server",
      script: "npm",
      args: "start",
      exp_backoff_restart_delay: 0,
    },
  ],
};
