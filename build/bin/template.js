/**
 * 监听 /examples/pages/template 目录下的所有模版文件，当模版文件发生改变时自动执行 npm run i18n，
 * 即执行 i18n.js 脚本，重新生成四种语言的 .vue 文件
 */
const path = require('path');
// 需要监听的模板文件
const templates = path.resolve(process.cwd(), './examples/pages/template');
// 监听器
const chokidar = require('chokidar');
let watcher = chokidar.watch([templates]);

watcher.on('ready', function() {
  console.log('监听 /examples/pages/template 目录下的所有模版文件，当模版文件发生改变时自动执行 npm run i18n');
  // 当发生改变的时候，运行命令
  watcher
    .on('change', function(changeEvent) {
      console.log('监听到模板发生变化:', changeEvent);
      exec('npm run i18n');
    });
});

function exec(cmd) {
  // 执行命令
  return require('child_process').execSync(cmd).toString().trim();
}
