module.exports = {
  apps: [
    {
      name: "sv-api",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      exp_backoff_restart_delay: 0,
    },
    {
      name: "sv-api",
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      exp_backoff_restart_delay: 0,
    },
  ],
};
