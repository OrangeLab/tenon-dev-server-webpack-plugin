const address = require('address')
const { DevServer } = require('@hummer/cli-plugin-build/dist/common/dev-server')
const path = require('path')

function TenonDevServer(options = {}) {
  this.host = options.host || address.ip();
  this.port = options.port || '5242';
  this.rootDir = options.rootDir || path.join(process.cwd(), 'dist/tenon');
}

TenonDevServer.prototype.apply = function(compiler) {
  let self = this;
  self.serverStart = false;
  compiler.plugin('afterEmit', function() {
    if (self.serverStart) return
    self.serverStart = true;
    // 启动server
    self.devServer = new DevServer(self.host, self.port, self.rootDir);
  });

  // TODO: send reload message to native while bundle change
  // compiler.plugin('afterCompile', function() {
    // console.log('ReloadBundle');
    
  // });
};

module.exports = TenonDevServer;