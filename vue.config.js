const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    /*     proxy: {
      '/mock': {
        target: 'https://uplink-monitor.swomat.com/shape/api/v1',
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: { '^/mock': '' },
      },
    }, */
  },
  lintOnSave: false, //关闭eslint检查
})
