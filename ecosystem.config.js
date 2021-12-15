module.exports = {
  apps: [
    {
      name: "sv-web",
      cwd: "./web",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      exp_backoff_restart_delay: 0,
    },
    {
      name: "sv-api",
      cwd: "./server",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      exp_backoff_restart_delay: 0,
    },
  ],
};
