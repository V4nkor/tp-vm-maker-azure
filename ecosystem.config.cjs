module.exports = {
  apps: [
    {
      name: 'tp-vm-maker-host',
      script: 'npm',
      args: 'run serve',
      cwd: './apps/back',
      watch: false,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'tp-vm-maker-back',
      script: 'npm',
      args: 'run serve',
      cwd: './apps/back',
      watch: false,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'tp-vm-maker-chat',
      script: 'npm',
      args: 'run serve',
      cwd: './apps/chat',
      watch: false,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'tp-vm-maker-front',
      script: 'npm',
      args: 'run serve',
      cwd: './apps/front',
      watch: false,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};